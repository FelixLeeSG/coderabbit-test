/**
 * 添加"一键新建发布"按钮的工具函数
 */

interface ButtonAction {
  tag: string;
  text: {
    content: string;
    tag: string;
  };
  type: string;
  url: string;
}

/**
 * 在生产环境下添加"一键新建发布"按钮
 * @param actions 按钮数组
 * @param requirementName 需求名称
 * @param spugs 应用的 spugs 数组
 * @param sourceBranch 源分支
 * @param workItemId 需求id
 * @param workItemType 需求类型
 * @param workScopeName 需求 meegle 所在空间
 * @returns 更新后的按钮数组
 */
export function addOneClickDeployButton(
  actions: ButtonAction[],
  requirementName: string,
  spugs: any[] | undefined,
  sourceBranch?: string,
  workItemId?: number,
  workItemType?: string,
  workScopeName?: string,
): ButtonAction[] {
  // 只在生产环境下添加"一键新建发布"按钮
  if (process.env.NODE_ENV === 'production' && spugs && spugs.length > 0) {
    // 遍历 spugs 数组，为每个元素创建一个按钮
    spugs.forEach((spug) => {
      if (!spug.name) return; // 如果没有 name，跳过

      // 根据环境类型设置按钮名称
      let envName = '';

      // 构建跳转链接及参数
      const deployUrl = new URL(
        'https://bg-prod-devops-1.vip/2/3',
      );

      // 添加按钮
      actions.push({
        tag: 'button',
        text: {
          content: `前往${envName}发布`,
          tag: 'plain_text',
        },
        type: 'default',
        url: deployUrl.toString(),
      });
    });
  }

  return actions;
}
