---
name: ship
description: 完成代码编写后，更新 CHANGELOG、提交并推送到远程仓库
user_invocable: true
---

完成代码编写后，执行以下步骤：

1. **更新 CHANGELOG.md**：在 `## [Unreleased]` 下新增一行，用 `- ` 开头，简要描述本次主要改动（不需要细节到具体样式，描述主要改动即可）
2. **提交**：将所有变更（含 CHANGELOG）提交，commit message 与 CHANGELOG 描述保持一致
3. **推送到远程**：执行 `git push`
