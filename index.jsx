import element from 'virtual-element';
import escape from 'escape-html';

export default {
  render ({props}) {
    const {title = '', description = '', canonicalUrl = '', language = 'en'} = props;
    const {openGraph = null, twitterCard = null} = props;
    const {faviconPng} = props;
    const {css = []} = props;
    const {scripts = []} = props;
    const {content = ''} = props;

    return (<html>
      <head>
        <meta content={escape(language)} name='language' />
        {/* eslint-disable */}
        <meta charset='utf-8' />
        {/* eslint-enable */}
        <meta name='viewport' content='width=device-width' initial-scale='1.0' maximum-scale='1.0' user-scalable='no' />
        {title ? <title>{title}</title> : ''}
        {description ? <meta content={escape(description)} name='description' /> : ''}
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
        {faviconPng ? <link rel='icon' type='image/png' href={escape(faviconPng)} /> : ''}
        {css.map(v => <link rel='stylesheet' type='text/css' href={escape(v)} />)}
        {scripts.map(v => {
          if (v.src) {
            if (v.defer) {
              return <script defer src={escape(v.src)}></script>;
            }

            return <script src={escape(v.src)}></script>;
          }

          if (v.content) {
            return (<script innerHTML={String(v.content)
              .replace(/<\/script>/g, '</" + "script>')
              .replace(new RegExp('\u2028|\u2029', 'g'), '')}></script>);
          }

          throw new Error('unknown script type');
        })}
      </head>
      <body>
        <div id='body' innerHTML={content}></div>
      </body>
    </html>);
  }
};
