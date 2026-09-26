# 夢のジャングル 計測用短縮URL

外部媒体には、下記の短縮URLを設置します。各URLは、GA4計測用のUTMパラメータを付けたLPトップへ307リダイレクトします。

| 媒体       | 設置場所               | 短縮URL                                                                    |
| ---------- | ---------------------- | -------------------------------------------------------------------------- |
| YouTube    | プロフィール           | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/yt-profile`        |
| YouTube    | 動画概要欄             | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/yt-description`    |
| YouTube    | 通常動画の固定コメント | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/yt-pinned-comment` |
| LINE       | 配信メッセージ         | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/line-message`      |
| LINE       | リッチメニュー         | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/line-richmenu`     |
| LINE       | プロフィール           | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/line-profile`      |
| Instagram  | プロフィール           | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/ig-profile`        |
| Instagram  | ストーリーズ           | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/ig-story`          |
| X          | プロフィール           | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/x-profile`         |
| X          | 投稿                   | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/x-post`            |
| Facebook   | プロフィール           | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/fb-profile`        |
| Facebook   | 投稿                   | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/fb-post`           |
| 営業メール | 本文                   | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/sales-email-body`  |
| メール     | 署名                   | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/email-signature`   |
| メール     | メルマガ               | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/newsletter`        |
| 名刺       | QRコード               | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/business-card`     |
| チラシ     | QRコード               | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/flyer`             |
| 営業資料   | QRコード               | `https://yume-jungle-moriage.yume-jungle.workers.dev/go/proposal`          |

## 管理方法

- 転送定義：`lib/tracking-links.ts`
- 転送処理：`app/go/[slug]/route.ts`
- スプレッドシートの計測URL列：この表の短縮URLと一致させる
- 未登録の短縮パス：LPトップへ安全に戻す
