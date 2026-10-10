#!/usr/bin/env bash
# 在服务器上滚动发布：切换 current 软链并保留最近 N 个版本
set -euo pipefail

VERSION="${1:?用法: release.sh <版本目录名> [发布根目录]}"
DEPLOY_ROOT="${2:-/opt/chart-constructor}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"

cd "$DEPLOY_ROOT"

# 目标版本必须已存在，避免把 current 切到不存在的目录
if [ ! -d "releases/$VERSION" ]; then
  echo "版本目录不存在: releases/$VERSION"
  exit 1
fi

# 相对软链保证容器内 /srv/current 能解析到 /srv/releases/<版本>
ln -sfn "releases/$VERSION" current

# 清理超期版本，跳过当前生效的版本
CURRENT_NAME="$(basename "$(readlink -f current)")"
for dir in $(ls -1dt releases/*/ 2>/dev/null | tail -n +$((KEEP_RELEASES + 1))); do
  name="$(basename "$dir")"
  if [ "$name" = "$CURRENT_NAME" ]; then
    continue
  fi
  echo "清理旧版本: releases/$name"
  rm -rf -- "releases/$name"
done

docker compose up -d
docker compose ps
echo "当前版本: $(readlink current)"
