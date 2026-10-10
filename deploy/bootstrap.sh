#!/usr/bin/env bash
# playground 首次部署初始化：创建目录、铺部署资产并启动静态站点容器
set -euo pipefail

# 发布根目录与运行用户，可通过环境变量覆盖
DEPLOY_ROOT="${DEPLOY_ROOT:-/opt/chart-constructor}"
RUN_USER="${RUN_USER:-ubuntu}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# 目录初始化：releases 存历史产物，caddy 存 Caddy 站点片段
sudo mkdir -p "$DEPLOY_ROOT/releases" "$DEPLOY_ROOT/caddy"
sudo chown -R "$RUN_USER:$RUN_USER" "$DEPLOY_ROOT"

# 首次没有产物时放置占位页，避免 current 指向不存在的目录
if [ ! -e "$DEPLOY_ROOT/current" ]; then
  mkdir -p "$DEPLOY_ROOT/releases/placeholder"
  printf '%s\n' '<!doctype html><meta charset="utf-8"><title>chart-constructor</title><p>站点初始化中' \
    > "$DEPLOY_ROOT/releases/placeholder/index.html"
  ln -sfn releases/placeholder "$DEPLOY_ROOT/current"
fi

# 同步仓库内的部署资产到发布根目录
# 脚本被同步到发布根目录后源与目标同路径，用 -ef 判断跳过自身拷贝
sync_asset() {
  if [ "$1" -ef "$2" ] 2>/dev/null; then
    return 0
  fi
  cp -f "$1" "$2"
}

sync_asset "$SCRIPT_DIR/nginx.conf" "$DEPLOY_ROOT/nginx.conf"
sync_asset "$SCRIPT_DIR/docker-compose.yml" "$DEPLOY_ROOT/docker-compose.yml"
sync_asset "$SCRIPT_DIR/caddy/chart-constructor.caddy" "$DEPLOY_ROOT/caddy/chart-constructor.caddy"

cd "$DEPLOY_ROOT"
docker compose up -d
docker compose ps
