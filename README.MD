# basic

```ts
import { bem, classnames } from 'bem2';

const { emsc, em, es, ec } = bem('button');
emsc('button'); // .button
emsc('button', 'primary'); // .button--primary
emsc('button', null, { disabled: true }); // .button.is-disabled

classnames('a', null, undefined, [1, 'b'], {'c': false, 'd': true}); // .a.1.b.d
```

# css

```scss
@import 'bem2/dist/bem.scss';

// .button
@include b(button) {
    // .button--primary
    @include m(primary) {}
    // .button.is-diabled
    @include when(disabled) {}
}
```

# CSS Module

```ts
import styles from './index.module.scss';

const { emsc } = bem('button', styles);
const newClassnames = classnames.bind(styles);
```

# bem options

## ts

```ts
import { bem, classnames } from 'bem2';

/// default options
bem.namespace = '';
bem.elementSeq = '__';
bem.modifferSeq = '--';
bem.statePrefix = 'is-';

/// test
bem.namespace = 'test-';
const { emsc } = bem('button');
emsc(); // .test-button

```

## css

```scss
@import '../lib/bem.scss';

$namespace: 'test-';

// .test-button
@include b(button) {}
```