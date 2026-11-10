# Zotero Replication Checker Locale File - Chinese Simplified (简体中文)
# Modern Fluent format (.ftl)

## Menu Items
replication-checker-tools-menu = 检查当前文献库的重复研究
replication-checker-context-menu = 检查重复研究
replication-checker-context-menu-ban = 屏蔽重复研究
replication-checker-context-menu-add-original = 添加原始文献
replication-checker-context-menu-add-originals = 添加原始文献（多篇）

## Progress Messages
replication-checker-progress-checking-library = 正在检查重复研究
replication-checker-progress-checking-collection = 正在检查分组中的重复研究
replication-checker-progress-scanning-library = 正在扫描文献库...
replication-checker-progress-scanning-collection = 正在扫描分组...
replication-checker-progress-found-dois = 找到 { $itemCount } 个含有 DOI 的条目（{ $uniqueCount } 个唯一）
replication-checker-progress-checking-database = 正在查询重复研究数据库...
replication-checker-progress-no-dois = 在分组中未找到含有 DOI 的条目
replication-checker-progress-complete = 检查完成
replication-checker-progress-failed = 检查失败
replication-checker-progress-match-count =
    { $count ->
        [one] 找到 1 个含有重复研究的条目
       *[other] 找到 { $count } 个含有重复研究的条目
    }
replication-checker-progress-copying-readonly = 正在将只读文献库中的条目复制到个人文献库...

## Alerts
replication-checker-alert-title = Zotero Replication Checker
replication-checker-alert-no-dois-selected = 所选条目中未找到 DOI。
replication-checker-alert-no-collection = 请在运行此检查前先选择一个分组。
replication-checker-alert-no-originals-available = 此重复研究没有可用的原始研究。
replication-checker-alert-no-doi = 所选条目没有 DOI。
replication-checker-add-original-success = 已成功将"{ $title }"添加到"{ $folderName }"。
replication-checker-add-original-exists = "{ $title }"已在您的文献库中——已更新"{ $folderName }"中的标签、笔记和关联。
replication-checker-add-original-add-all-btn = 添加所有原始文献
replication-checker-add-original-confirm =
    { $count ->
        [one] 为此重复研究找到 1 篇原始文献。请选择您希望添加到文献库的原始文献。
       *[other] 为此重复研究找到 { $count } 篇原始文献。请选择您希望添加到文献库的原始文献。
    }
replication-checker-add-original-select-btn = 选择要添加的原始文献
replication-checker-add-original-batch-success =
    { $newCount ->
        [one] 已在"{ $folderName }"中新增 1 篇并更新 { $existingCount } 篇原始研究。
       *[other] 已在"{ $folderName }"中新增 { $newCount } 篇并更新 { $existingCount } 篇原始研究。
    }
replication-checker-add-original-batch-new-only =
    { $count ->
        [one] 已成功将 1 篇原始研究添加到"{ $folderName }"。
       *[other] 已成功将 { $count } 篇原始研究添加到"{ $folderName }"。
    }
replication-checker-add-original-batch-exists-only =
    { $count ->
        [one] 1 篇原始研究已在您的文献库中——已更新"{ $folderName }"中的标签、笔记和关联。
       *[other] { $count } 篇原始研究已在您的文献库中——已更新"{ $folderName }"中的标签、笔记和关联。
    }
replication-checker-error-title = Replication Checker - 错误
replication-checker-error-api = 无法从 API 获取数据 - 请检查您的网络连接或稍后重试。
replication-checker-error-body =
    检查 { $target } 的重复研究时失败：

    { $details }

    无法从 API 获取数据 - 请检查您的网络连接或稍后重试。
replication-checker-target-library = 当前文献库
replication-checker-target-selected = 所选条目
replication-checker-target-collection = 所选分组

## Ban Feature
replication-checker-ban-title = 屏蔽重复研究
replication-checker-ban-confirm =
    { $count ->
        [one] 确定要屏蔽 1 篇重复研究吗？
       *[other] 确定要屏蔽 { $count } 篇重复研究吗？
    }

    这些条目将被移至回收站，且不会在以后的检查中重新添加。
replication-checker-ban-success =
    { $count ->
        [one] 已成功屏蔽 1 篇重复研究。
       *[other] 已成功屏蔽 { $count } 篇重复研究。
    }
replication-checker-alert-no-replications-selected = 未选择任何重复研究条目。

## Dialog
replication-checker-dialog-title = 找到重复研究
replication-checker-dialog-intro =
    为以下文献找到重复研究：
    "{ $title }"
replication-checker-dialog-count =
    { $count ->
        [one] 找到 1 篇重复研究：
       *[other] 找到 { $count } 篇重复研究：
    }
replication-checker-dialog-item =
    { $index }. { $title }
    ({ $year })
       结果：{ $outcome }
replication-checker-dialog-more =
    { $count ->
        [one] ...以及另外 1 篇重复研究
       *[other] ...以及另外 { $count } 篇重复研究
    }
replication-checker-dialog-question = 是否添加重复研究信息？
replication-checker-dialog-progress-title = 已添加重复研究信息
replication-checker-dialog-progress-line = 已向"{ $title }"添加重复研究信息
replication-checker-notif-replication-new =
    { $count ->
        [one] 已成功将 1 篇新重复研究添加到"{ $folderName }"。
       *[other] 已成功将 { $count } 篇新重复研究添加到"{ $folderName }"。
    }
replication-checker-notif-replication-exists =
    { $count ->
        [one] 1 篇重复研究已在您的文献库中——已更新"{ $folderName }"中的标签、笔记和关联。
       *[other] { $count } 篇重复研究已在您的文献库中——已更新"{ $folderName }"中的标签、笔记和关联。
    }
replication-checker-notif-replication-mixed =
    { $newCount ->
        [one] 已在"{ $folderName }"中新增 1 篇并更新 { $existingCount } 篇重复研究。
       *[other] 已在"{ $folderName }"中新增 { $newCount } 篇并更新 { $existingCount } 篇重复研究。
    }
replication-checker-dialog-is-replication-title = 找到原始研究
replication-checker-dialog-is-replication-message =
    { $count ->
        [one] 未找到重复研究，但这似乎是一篇重复研究论文。找到 1 篇原始文献。是否将其添加到您的文献库？
       *[other] 未找到重复研究，但这似乎是一篇重复研究论文。找到 { $count } 篇原始文献。请选择您希望添加到文献库的原始文献。
    }

## Read-Only Library Handling
replication-checker-readonly-dialog-title = 检测到只读文献库
replication-checker-readonly-dialog-message =
    { $replicationCount ->
        [one] 此文献库为只读。我们找到 { $itemCount } 个条目，含有 1 篇重复研究。
       *[other] 此文献库为只读。我们找到 { $itemCount } 个条目，含有 { $replicationCount } 篇重复研究。
    }

    是否将原始文献及其重复研究复制到您个人文献库的"重复研究文件夹"？

## Shared Group Library Handling
replication-checker-group-dialog-title = 添加到共享群组文献库？
replication-checker-group-dialog-message =
    FLoRA 在群组文献库“{ $libraryName }”中为 { $itemCount } 个条目找到了重复或复现研究。

    添加后会创建此群组所有成员都能看到的条目、笔记和标签。您也可以改为将原始文章及其重复和复现研究复制到个人文献库。
replication-checker-group-dialog-add-btn = 添加到群组文献库
replication-checker-group-dialog-copy-btn = 复制到我的文献库

## Results Messages
replication-checker-results-title-library = 文献库扫描完成
replication-checker-results-title-selected = 所选条目扫描完成
replication-checker-results-title-collection = 分组扫描完成
replication-checker-results-total = 已检查条目总数：{ $count }
replication-checker-results-dois = 含有 DOI 的条目：{ $count }
replication-checker-results-found =
    { $count ->
        [one] 1 个条目含有重复研究，已存储在"{ $folderName }"中。
       *[other] { $count } 个条目含有重复研究，已存储在"{ $folderName }"中。
    }
replication-checker-results-none = 未找到重复研究。
replication-checker-results-reproductions-found =
    { $count ->
        [one] 1 个条目含有重复实验，已存储在"{ $folderName }"中。
       *[other] { $count } 个条目含有重复实验，已存储在"{ $folderName }"中。
    }
replication-checker-results-reproductions-none = 未找到重复实验。
replication-checker-results-footer = 查看笔记了解详情，或选择条目重新检查。

## Tags
replication-checker-tag = 已被重复
replication-checker-tag-is-replication = 是重复研究
replication-checker-tag-added-by-checker = 由 Replication Checker 添加
replication-checker-tag-success = 重复研究：成功
replication-checker-tag-failure = 重复研究：失败
replication-checker-tag-mixed = 重复研究：混合结果
replication-checker-tag-multiple-originals = 重复研究：多篇原始文献
replication-checker-tag-readonly-origin = 原始文献在只读文献库中
replication-checker-tag-has-been-replicated = 已被重复
replication-checker-tag-has-been-reproduced = 已被复现
replication-checker-tag-in-flora = 收录于 FLoRA

## Note Template
replication-checker-note-title = 找到重复研究
replication-checker-note-warning = 此笔记为自动生成。如果您对其进行编辑，下次检查时将创建新笔记，本版本将保持原样。
replication-checker-note-intro = 本研究已被重复验证：
replication-checker-note-feedback = 您觉得此结果有用吗？请在<a href="{ $url }" target="_blank">此处</a>提供反馈！
replication-checker-note-data-issues = 您发现数据中有任何问题吗？请在<a href="{ $url }" target="_blank">此处</a>反馈！
replication-checker-note-footer = 由 Zotero Replication Checker 使用 FORRT 文献数据库（FLoRA）生成

## Replication Item Details
replication-checker-li-no-title = 无可用标题
replication-checker-li-no-authors = 无可用作者
replication-checker-li-no-journal = 无期刊信息
replication-checker-li-na = 不适用
replication-checker-li-doi-label = DOI：
replication-checker-li-outcome = 作者报告的结果：
replication-checker-li-link = 本研究有关联报告：

## First Run Prompt
replication-checker-prompt-title = 欢迎使用 Zotero Replication Checker！
replication-checker-prompt-first-run =
    感谢安装 Zotero Replication Checker！

    此插件通过对照 FORRT 文献数据库（FLoRA）检查您的文献库条目，帮助您发现相关的重复研究。

    是否现在扫描您的文献库以查找重复研究？

    • 单击"确定"开始扫描（这可能需要几分钟）
    • 单击"取消"跳过 - 您随时可以从"工具"菜单进行扫描

reproduction-checker-readonly-dialog-title = 检测到只读文献库
reproduction-checker-readonly-dialog-message =
    此文献库为只读。我们发现 { $itemCount } 个条目，共有 { $reproductionCount } 项复现研究。

    是否将原始文章及其复现研究复制到个人文献库的复现文件夹？

## Onboarding
onboarding-features-privacy-title = 隐私优先
onboarding-features-privacy-body = 不会发送您的 DOI。只有加扰代码的前 3 个字符会离开您的电脑，匹配在本地完成。
onboarding-features-groups-title = 共享的群组文献库
onboarding-features-new = 新功能
onboarding-features-readonly-title = 只读文献库
onboarding-features-readonly-body = 插件先询问，然后将原始研究和相关研究复制到个人文献库。
onboarding-features-verdict-title = 是起点，而非定论
onboarding-features-verdict-body = 标签反映作者如何描述其结果。重复研究失败可能反映偶然、统计检验力低、自身缺陷或条件变化，而不只是原始发现有误。
onboarding-features-languages-title = 6 种语言
onboarding-features-languages-body = 跟随 Zotero 的语言。
onboarding-welcome-title = 您文献库中的研究被重复过吗？
onboarding-welcome-lead = Replication Checker 将您的文献库与 FLoRA（FORRT Literature Database）比对，显示哪些论文已被重复或复现。
onboarding-welcome-tags-title = 标签
onboarding-welcome-tags-body = 查看哪些论文有重复研究及其结果。
onboarding-welcome-notes-title = 笔记
onboarding-welcome-notes-body = 每篇匹配的论文都会获得一条笔记，包含相关研究、结果和 DOI 链接。
onboarding-welcome-studies-title = 研究
onboarding-welcome-studies-body = 重复研究和复现研究都会添加到同一个 FLoRA 分类中。
onboarding-scan-title = 准备好扫描您的文献库了吗？
onboarding-scan-lead = 首次扫描可能需要几分钟，具体取决于文献库的大小。
onboarding-scan-note = 您也可以稍后从“工具”菜单扫描，并从“帮助”菜单重新打开本指南。
onboarding-btn-next = 下一步
onboarding-btn-back = 上一步
onboarding-btn-skip = 跳过导览
onboarding-btn-done = 开始使用
onboarding-btn-scan = 扫描我的文献库
onboarding-btn-later = 暂不
onboarding-btn-close = 关闭
onboarding-features-title = 值得了解
onboarding-features-groups-body = 未经询问，不会向共享文献库添加任何内容。您可以在设置中更改。
onboarding-btn-tour = 开始导览
onboarding-btn-remind = 稍后提醒
onboarding-btn-open-settings = 打开设置
onboarding-done-title = 就这些
onboarding-done-lead = 您的文献库已检查过。可随时从“帮助”菜单重新打开本导览。
onboarding-example-prefix = FLoRA 导览示例
onboarding-tour-tools-title = 检查整个文献库
onboarding-tour-tools-body = 在左侧选择一个文献库，然后选择此项。
onboarding-tour-menu-title = 检查部分文献
onboarding-tour-menu-body = 右键点击选中的条目或分类。“添加原始文献”和“屏蔽重复研究”也在这里。
onboarding-tour-example-title = 示例文献
onboarding-tour-example-body = 检查后，匹配的文献会是这样。导览结束时会删除此示例。
onboarding-tour-autocheck-title = 自动检查
onboarding-tour-autocheck-body = 插件检查文献库的频率，以及是否在添加新条目时进行检查。
onboarding-tour-libraries-title = 文献库与群组文献库
onboarding-tour-libraries-body = 定期检查涵盖哪些文献库，以及检查在共享群组文献库中会做什么。
onboarding-tour-stats-title = 您的 FLoRA 统计
onboarding-tour-stats-body = 按文献库计数。Atlas 链接已加密，30 天后失效。
onboarding-tour-banned-title = 屏蔽列表
onboarding-tour-banned-body = 移除某个条目后，它可以再次被添加。
onboarding-tour-names-title = 分类名称
onboarding-tour-names-body = 重命名 FLoRA 分类。条目位置不变。

## Reproduction Feature - Menu Items
reproduction-checker-context-menu-ban = 屏蔽重复实验

## Reproduction Feature - Tags
reproduction-checker-tag = 已被复现
reproduction-checker-tag-is-reproduction = 是重复实验
reproduction-checker-tag-added-by-checker = 由 Replication Checker 添加
reproduction-checker-tag-readonly-origin = 原始文献在只读文献库中

## Reproduction Feature - Outcome Tags
reproduction-checker-tag-outcome-cs-robust = 重复实验：计算成功，结果稳健
reproduction-checker-tag-outcome-cs-challenges = 重复实验：计算成功，稳健性存在挑战
reproduction-checker-tag-outcome-cs-not-checked = 重复实验：计算成功，稳健性未检查
reproduction-checker-tag-outcome-ci-robust = 重复实验：存在计算问题，结果稳健
reproduction-checker-tag-outcome-ci-challenges = 重复实验：存在计算问题，稳健性存在挑战
reproduction-checker-tag-outcome-ci-not-checked = 重复实验：存在计算问题，稳健性未检查
reproduction-checker-tag-multiple-originals = 重复实验：多篇原始文献

## Reproduction Feature - Note Template
reproduction-checker-note-title = 找到重复实验
reproduction-checker-note-warning = 此笔记为自动生成。如果您对其进行编辑，下次检查时将创建新笔记，本版本将保持原样。
reproduction-checker-note-intro = 本研究已被重复验证（复现）：
reproduction-checker-note-feedback = 您觉得此结果有用吗？请在<a href="{ $url }" target="_blank">此处</a>提供反馈！
reproduction-checker-note-data-issues = 您发现数据中有任何问题吗？请在<a href="{ $url }" target="_blank">此处</a>反馈！
reproduction-checker-note-footer = 由 Zotero Replication Checker 使用 FORRT 文献数据库（FLoRA）生成

## Reproduction Feature - Item Details
reproduction-checker-li-no-title = 无可用标题
reproduction-checker-li-no-authors = 无可用作者
reproduction-checker-li-no-journal = 无期刊信息
reproduction-checker-li-na = 不适用
reproduction-checker-li-doi-label = DOI：
reproduction-checker-li-outcome = 重复实验结果：
reproduction-checker-li-link = 本研究有关联报告：

## Reproduction Feature - Alerts
reproduction-checker-alert-no-reproductions-selected = 未选择任何重复实验条目。
reproduction-checker-ban-title = 屏蔽重复实验
reproduction-checker-ban-confirm =
    { $count ->
        [one] 确定要屏蔽 1 篇重复实验吗？
       *[other] 确定要屏蔽 { $count } 篇重复实验吗？
    }

    这些条目将被移至回收站，且不会在以后的检查中重新添加。
reproduction-checker-ban-success =
    { $count ->
        [one] 已成功屏蔽 1 篇重复实验。
       *[other] 已成功屏蔽 { $count } 篇重复实验。
    }

## Reproduction Feature - Dialog
replication-checker-dialog-title-studies = 发现相关研究
replication-checker-dialog-intro-studies =
    为以下条目找到研究：
    “{ $title }”
replication-checker-dialog-question-studies = 是否要将这些信息添加到您的文献库？
reproduction-checker-dialog-title = 找到重复实验
reproduction-checker-dialog-intro =
    为以下文献找到重复实验：
    "{ $title }"
reproduction-checker-dialog-count =
    { $count ->
        [one] 找到 1 篇重复实验：
       *[other] 找到 { $count } 篇重复实验：
    }
reproduction-checker-dialog-item =
    { $index }. { $title }
    ({ $year })
       结果：{ $outcome }
reproduction-checker-dialog-more =
    { $count ->
        [one] ...以及另外 1 篇重复实验
       *[other] ...以及另外 { $count } 篇重复实验
    }
reproduction-checker-dialog-question = 是否添加重复实验信息？
reproduction-checker-dialog-progress-title = 已添加重复实验信息
reproduction-checker-dialog-progress-line = 已向"{ $title }"添加重复实验信息

## Reproduction Feature - Progress
reproduction-checker-progress-reproductions-found =
    { $count ->
        [one] 找到 1 个含有重复实验的条目
       *[other] 找到 { $count } 个含有重复实验的条目
    }

## Preference Pane
pref-autocheck-title = 自动检查文献库的重复研究
pref-autocheck-description = 定期自动检查您的文献库以发现重复研究
pref-autocheck-disabled = 已禁用（仅手动检查）
pref-autocheck-daily = 每日（每 24 小时检查一次）
pref-autocheck-weekly = 每周（每 7 天检查一次）
pref-autocheck-monthly = 每月（每 30 天检查一次）
pref-autocheck-new-items = 自动检查新添加到文献库的条目（推荐）
pref-autocheck-new-items-hint = 如果您希望手动运行所有重复研究检查，请禁用此选项。
pref-autocheck-note = 当 Zotero 打开时，自动检查在后台运行。您仍然可以通过"工具"菜单手动检查。
pref-folder-title = 重复研究文件夹名称
pref-repro-folder-title = 再现研究文件夹名称
pref-originals-replication-folder-title = 原始文献文件夹（关联至重复研究）
pref-originals-reproduction-folder-title = 原始文献文件夹（关联至再现研究）

## Collection Names
pref-root-folder-title = FLoRA 主分类
pref-collections-title = FLoRA 分类名称
pref-collections-description = 点击铅笔重命名分类，再点击对勾保存。分类会立即重命名，所有条目保持原位。
pref-collections-edit = 重命名
pref-collections-save = 保存
pref-collections-cancel = 取消
pref-collections-error-empty = 请输入名称。
pref-collections-error-duplicate = 另一个 FLoRA 分类已使用此名称。
pref-collections-error-save = 无法重命名分类，请重试。
pref-autocheck-libraries-title = 定期检查包含的文献库
pref-autocheck-libraries-personal = 仅个人文献库（推荐）
pref-autocheck-libraries-groups = 仅群组文献库
pref-autocheck-libraries-all = 所有文献库
pref-autocheck-libraries-hint = 只读的群组文献库会被跳过，因为无法向其中添加内容。
pref-group-add-title = 向群组文献库添加条目
pref-group-add-ask = 每次询问（推荐）
pref-group-add-always = 始终添加条目
pref-group-add-tags = 仅添加标签和笔记，不添加新条目
pref-group-add-hint = 适用于您可以编辑的群组文献库。对于只读文献库，插件在复制到个人文献库前始终会询问。

## Stats Pane
pref-stats-title = 您的 FLoRA 统计数据
pref-stats-description = 基于您当前 Zotero 文献库的统计数据
pref-stats-has-replication = 有重复研究的文章
pref-stats-has-reproduction = 有再现研究的文章
pref-stats-is-replication = 被标识为重复研究的文章
pref-stats-originals = 已追踪的原始文章
pref-stats-refresh = 刷新统计数据
pref-stats-no-originals = 在您的文献库中未找到已追踪的原始文章。请先运行重复研究检查。
pref-stats-open-atlas = 在 FLoRA Atlas 中打开 ↗
pref-stats-view-flora = 查看 FLoRA 数据库 →

pref-blacklist-title = 已屏蔽的重复研究
pref-blacklist-description = 管理您已屏蔽不在文献库中显示的重复研究
pref-blacklist-col-replication = 重复研究论文
pref-blacklist-col-original = 原始论文
pref-blacklist-col-type = 类型
pref-blacklist-col-banned = 屏蔽日期
pref-blacklist-empty = 没有已屏蔽的重复研究
pref-blacklist-remove = 移除所选
pref-blacklist-clear = 清除所有已屏蔽的重复研究
pref-blacklist-hint = 已屏蔽的重复研究不会在以后的检查中重新添加。您可以使用右键菜单屏蔽重复研究。
