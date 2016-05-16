# deku-page-layout
Render page layout using Deku. Useful for apps that use already use [Deku](https://github.com/anthonyshort/deku) to avoid another template engine dependency.

## USAGE

```jsx
import PageLayout from 'deku-page-layout';
import {renderString, tree} from 'deku'; // using deku@1

const content = '<div>OK</div>';
const layout = <PageLayout title='Page Title' content={content} />

const html = renderString(tree(layout));
console.log(html);
```

See [tests](https://github.com/micnews/deku-page-layout/blob/master/test.jsx) for other supported options.

## LICENSE

MIT
