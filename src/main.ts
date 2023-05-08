import { bem, classnames } from '../lib/bem';
import styles from './main.module.scss';

bem.namespace = 'demo-';
console.log(styles)
const { emsc } = bem('button', styles);
const clsname = classnames.bind(styles);

console.log(classnames('a', null, undefined, [1, 'b'], {'c': false, 'd': true}));

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <button class="${emsc()}">按钮</button>
    <button class="${emsc(null, 'primary')}">按钮</button>
    <button class="${emsc(null, 'primary', {
        'disabled': true,
    })}">按钮</button>
    
    <button class="${clsname(['button', {
        'button--primary': true,
        'is-disabled': false,
    }, [['is-disabled']]])}">按钮</button>
`

