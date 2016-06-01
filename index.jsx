import element from 'virtual-element';
import escape from 'escape-html';

export default {
  render ({props}) {
    const {title = '', description = '', language = 'en'} = props;
    const {author = '', medium = '', robots = ''} = props;
    const {canonicalUrl = '', alternateUrl = '', ampUrl = ''} = props;
    const {openGraph = null, twitterCard = null} = props;
    const {faviconPng} = props;
    const {css = []} = props;
    const {scripts = []} = props;
    const {content = ''} = props;
    const {appleTouchIcon = {}} = props;
    const {noscript} = props;

    return (<html>
      <head>
        <meta content={escape(language)} name='language' />
        {/* eslint-disable */}
        <meta charset='utf-8' />
        {/* eslint-enable */}
        <meta name='viewport' content='width=device-width' initial-scale='1.0' maximum-scale='1.0' user-scalable='no' />
        {title ? <title>{title}</title> : ''}
        {description ? <meta content={escape(description)} name='description' /> : ''}
        {robots ? <meta name='robots' content={escape(robots)} /> : ''}
        {author ? <meta name='author' content={escape(author)} /> : ''}
        {medium ? <meta name='medium' content={escape(medium)} /> : ''}
        {openGraph ? <meta content='website' property='og:type' /> : ''}
        {openGraph ? <meta content={escape(openGraph.title || title)} property='og:title' /> : ''}
        {openGraph ? <meta content={escape(openGraph.description || description)} property='og:description' /> : ''}
        {openGraph ? <meta content={escape(openGraph.url || canonicalUrl)} property='og:url' /> : ''}
        {openGraph ? <meta content={escape(openGraph.image || '')} property='og:image' /> : ''}
        {openGraph ? <meta content={escape(openGraph.siteName || '')} property='og:site_name' /> : ''}
        {twitterCard ? <meta name='twitter:card' content={escape(twitterCard.card || 'summary_large_image')} /> : ''}
        {twitterCard ? <meta name='twitter:site' content={escape(twitterCard.site)} /> : ''}
        {twitterCard ? <meta name='twitter:creator' content={escape(twitterCard.creator)} /> : ''}
        {twitterCard ? <meta name='twitter:url' content={escape(twitterCard.url || canonicalUrl)} /> : ''}
        {twitterCard ? <meta name='twitter:title' content={escape(twitterCard.title || title)} /> : ''}
        {twitterCard ? <meta name='twitter:description' content={escape(twitterCard.description || description)} /> : ''}
        {twitterCard ? <meta name='twitter:image' content={escape(twitterCard.image || '')} /> : ''}
        {canonicalUrl ? <link rel='canonical' href={escape(canonicalUrl)} /> : ''}
        {alternateUrl ? <link rel='alternate' href={escape(alternateUrl)} /> : ''}
        {ampUrl ? <link rel='amphtml' href={escape(ampUrl)} /> : ''}
        {faviconPng ? <link rel='icon' type='image/png' href={escape(faviconPng)} /> : ''}
        {Object.keys(appleTouchIcon).map(iconSize => {
          const iconHref = appleTouchIcon[iconSize];

          if (iconSize === 'default') {
            return <link rel='apple-touch-icon' href={escape(iconHref)} />;
          }

          return <link rel='apple-touch-icon' sizes={iconSize} href={escape(iconHref)} />;
        })}
        {css.map(v => <link rel='stylesheet' type='text/css' href={escape(v)} />)}
        {scripts.map(v => {
          if (v.src) {
            if (v.defer) {
              return <script defer src={escape(v.src)}></script>;
            }

            return <script src={escape(v.src)}></script>;
          }

          if (v.content) {
            return <script innerHTML={String(v.content)}></script>;
          }

          if (v.json) {
            return <script id={v.id || 'json'} type='application/json' innerHTML={JSON.stringify(v.json)}></script>;
          }

          if (v.schema) {
            return <script type='application/ld+json' innerHTML={JSON.stringify(v.schema)}></script>;
          }

          throw new Error('unknown script type');
        })}
        {noscript ? <noscript>{noscript}</noscript> : ''}
      </head>
      <body>
        <div id='body' innerHTML={content}></div>
      </body>
    </html>);
  }
};
