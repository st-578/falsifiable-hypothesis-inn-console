const vscode = require('vscode');

function activate(context) {
  console.log('Falsifiable Hypothesis Inn Console activated!');

  // 1. 新規仮説生成
  let generate = vscode.commands.registerCommand('falsifiable.generate', async () => {
    const editor = vscode.window.activeTextEditor;
    const template = `# 新規反証可能仮説

**タイトル**  
[タイトルを入力]

**帰無仮説（デフォルト）**  
[何をやっても変わらない]

**対立仮説**  
[これをやったら良くなるはず]

**KPI予測表**  
| 項目 | 現在値 | 予測 | 現実予測 | ズレ |
|------|--------|------|----------|------|

**検証ルール**  
四半期PDSAサイクルでt検定`;
    
    const doc = await vscode.workspace.openTextDocument({ content: template, language: 'markdown' });
    await vscode.window.showTextDocument(doc);
    vscode.window.showInformationMessage('✅ 新規反証可能仮説テンプレートを作成しました！');
  });

  // 2. フォーク提案
  let fork = vscode.commands.registerCommand('falsifiable.fork', () => {
    vscode.window.showInformationMessage('🔀 この仮説をフォークして改善しますか？（メインリポジトリのPRをおすすめ）');
    vscode.env.openExternal(vscode.Uri.parse('https://github.com/st-578/falsifiable-hypothesis-inn'));
  });

  // 3. X投稿テンプレート生成
  let postToX = vscode.commands.registerCommand('falsifiable.postToX', () => {
    const template = `🛠️ falsifiable-hypothesis-inn に新しい仮説追加しました！

反証可能な仮説をみんなで検証するプラットフォームです。

サイト：https://st-578.github.io/falsifiable-hypothesis-inn
GitHub：https://github.com/st-578/falsifiable-hypothesis-inn

フォークして参加待機中！ #FalsifiableHypothesisInn`;
    
    vscode.env.clipboard.writeText(template);
    vscode.window.showInformationMessage('📋 X投稿テンプレートをクリップボードにコピーしました！');
  });

  context.subscriptions.push(generate, fork, postToX);
}

function deactivate() {}

module.exports = { activate, deactivate };
