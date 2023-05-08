export type IClsname = undefined | null | string | boolean | number | Record<string, any> | IClsname[];

function parse(cls: IClsname): string[] {
    if(cls === undefined || cls === null || typeof cls === 'boolean') return [];
    else if(typeof cls === 'string' || typeof cls === 'number') return [cls + ''];
    else if(Array.isArray(cls)) {
        return cls.flatMap(cls2 => parse(cls2));
    } else {
        const result: string[] = [];
        for (const clsname in cls) {
            const value = cls[clsname];
            if(!!value) result.push(clsname);
        }
        return result;
    }
}

export function classnames(this: Record<string, string> | void, ...clsname: IClsname[]) {
    const mapto = (clsname: string): string => {
        if(this && this[clsname]) return this[clsname];
        return clsname;
    }
    return parse(clsname).reduce((total, cls) => total += ` ${mapto(cls)}`, '').trim();
}

export function bem(block: string, map?: Record<string, string>) {
    const { namespace, elementSeq, modifferSeq, statePrefix } = bem;
    const blockName = `${namespace}${block}`;

    // 实现CSS Module
    function mapto(clsname: string): string {
        if(map && map[clsname]) return map[clsname];
        return clsname;
    }

    function emsc(element?: string | null, modiffer?: IClsname, state?: IClsname, clsname?: IClsname): string {
        let result = mapto(blockName);
        let elementName: string;
        if(!!element) {
            result = mapto(`${blockName}${elementSeq}${element}`);
            elementName = `${blockName}${elementSeq}${element}`;
        } else {
            elementName = blockName;
        }

        parse(modiffer).forEach(m => result += ` ${mapto(`${elementName}${modifferSeq}${m}`)}`);
        parse(state).forEach(s => result += ` ${mapto(`${statePrefix}${s}`)}`);
        parse(clsname).forEach(c => result += ` ${mapto(c)}`);

        return result.trim();
    }

    function em(e?: string | null, m?: IClsname, clsname?: IClsname) {
        return emsc(e, m, null, clsname);
    }
    function es(e?: string | null, s?: IClsname, clsname?: IClsname) {
        return emsc(e, null, s, clsname);
    }
    function ec(e?: string | null, c?: IClsname) {
        return emsc(e, null, null, c);
    }

    return { emsc, em, es, ec } as const;
}
bem.namespace = '';
bem.elementSeq = '__';
bem.modifferSeq = '--';
bem.statePrefix = 'is-';