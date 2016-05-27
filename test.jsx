import element from 'virtual-element';
import test from 'tape';
import tsml from 'tsml';
import {renderString, tree} from 'deku';
import Layout from './index.jsx';

test('render simplest layout', t => {
  const html = renderString(tree(<Layout />));
  t.equal(html, tsml`<html>
    <head>
      <meta content="en" name="language"></meta>
      <meta charset="utf-8"></meta><meta name="viewport" content="width=device-width" initial-scale="1.0" maximum-scale="1.0" user-scalable="no"></meta>
    </head>
    <body>
      <div id="body"></div>
    </body>
    </html>`);
  t.end();
});

test('render simplest with content', t => {
  const html = renderString(tree(<Layout content='<div>OK</div>'/>));
  t.equal(html, tsml`<html>
    <head>
      <meta content="en" name="language"></meta>
      <meta charset="utf-8"></meta><meta name="viewport" content="width=device-width" initial-scale="1.0" maximum-scale="1.0" user-scalable="no"></meta>
    </head>
    <body>
      <div id="body">
        <div>OK</div>
      </div>
    </body>
    </html>`);
  t.end();
});

test('render advanced layout', t => {
  const css = [
    '/index.css',
    '/common.css',
    '/other.css'
  ];

  const scripts = [
    {src: '/index.js'},
    {src: '/common.js', defer: true},
    {content: 'window.VALUE = 10;'}
  ];

  const openGraph = {
    title: 'og title',
    description: 'og description',
    image: 'https://example.com/open-graph-image.png',
    url: 'https://example.com/open-graph',
    siteName: 'example'
  };

  const twitterCard = {
    site: '@examplesite',
    creator: '@example',
    url: 'https://example.com/twitter',
    title: 'tw title',
    description: 'tw description',
    image: 'https://example.com/twitter-image.png'
  };

  const html = renderString(tree(<Layout
    title='Page title'
    canonicalUrl='https://example.com/canonical'
    alternateUrl='https://example.com/alternate'
    description='Page description'
    css={css}
    openGraph={openGraph}
    twitterCard={twitterCard}
    scripts={scripts}
    content='<div>OK</div>'
    />));

  t.equal(html, tsml`<html>
    <head>
      <meta content="en" name="language"></meta>
      <meta charset="utf-8"></meta>
      <meta name="viewport" content="width=device-width" initial-scale="1.0" maximum-scale="1.0" user-scalable="no"></meta>
      <title>Page title</title>
      <meta content="Page description" name="description"></meta>
      <meta content="website" property="og:type"></meta>
      <meta content="og title" property="og:title"></meta>
      <meta content="og description" property="og:description"></meta>
      <meta content="https://example.com/open-graph" property="og:url"></meta>
      <meta content="https://example.com/open-graph-image.png" property="og:image"></meta>
      <meta content="example" property="og:site_name"></meta>
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:site" content="@examplesite"></meta>
      <meta name="twitter:creator" content="@example"></meta>
      <meta name="twitter:url" content="https://example.com/twitter"></meta>
      <meta name="twitter:title" content="tw title"></meta>
      <meta name="twitter:description" content="tw description"></meta>
      <meta name="twitter:image" content="https://example.com/twitter-image.png"></meta>
      <link rel="canonical" href="https://example.com/canonical"></link>
      <link rel="alternate" href="https://example.com/alternate"></link>
      <link rel="stylesheet" type="text/css" href="/index.css"></link>
      <link rel="stylesheet" type="text/css" href="/common.css"></link>
      <link rel="stylesheet" type="text/css" href="/other.css"></link>
      <script src="/index.js"></script>
      <script defer="true" src="/common.js"></script>
      <script>window.VALUE = 10;</script>
    </head>
    <body>
      <div id="body">
        <div>OK</div>
      </div>
    </body>
    </html>`);
  t.end();
});

test('inline json script tag', t => {
  const json = {
    value: 'abc',
    value2: 10
  };

  const html = renderString(tree(<Layout scripts={[{json, id: 'initial-json'}]} />));
  t.equal(html, tsml`<html>
    <head>
      <meta content="en" name="language"></meta>
      <meta charset="utf-8"></meta><meta name="viewport" content="width=device-width" initial-scale="1.0" maximum-scale="1.0" user-scalable="no"></meta>
      <script id="initial-json" type="application/json">{"value":"abc","value2":10}</script>
    </head>
    <body>
      <div id="body"></div>
    </body>
    </html>`);
  t.end();
});
