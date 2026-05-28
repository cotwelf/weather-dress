---
name: ship
description: 完成代码编写后，更新 CHANGELOG、提交并推送到远程仓库
user_invocable: true
---

完成代码编写后，执行以下步骤：

1. **更新 CHANGELOG.md**：
   - 先读取 CHANGELOG.md，检查是否已有今日日期的标题（格式：`## YYYY-MM-DD`）
   - 如果今日已有标题，在该标题下的条目末尾追加新条目
   - 如果今日没有标题，在 `## [Unreleased]` 下方插入新的日期标题和条目
   - **格式示例**：
     ```
     ## 2026-05-28

     - 🆕 新增功能描述
     - ⚡️ 优化改进描述
     - 🐞 Bug 修复描述
     ```
   - 条目前加 emoji 标识类型：
     - 🆕 新增内容
     - ⚡️ 优化改进
     - 🐞 Bug 修复
   - **不要写版本号，只用日期作为标题**
   - **不要修改或删除已有条目**
2. **提交**：将所有变更（含 CHANGELOG）提交，commit message 与 CHANGELOG 描述保持一致
3. **推送到远程**：执行 `git push`
