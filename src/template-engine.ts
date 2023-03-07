type TemplateVariables<S extends string> = S extends `${infer BS}{{${infer Variable}}}${infer AS}` ?
    Variable extends '' ? 
    TemplateVariables<BS> | TemplateVariables<AS> : 
    TemplateVariables<BS> | Strip<Variable> | TemplateVariables<AS>
    : never;

type Replacements<S extends string> = {
    [P in TemplateVariables<S>]: string;
};

type Strip<S extends string> =
    S extends '' ? never :
    S extends ` ${infer T}` ? Strip<T> :
    S extends `${infer T} ` ? Strip<T> :
    S;

const interpolate = <T extends string>(template: T, replacements: Replacements<T>): string => Object.entries(replacements).reduce((acc, [key, value]): string => acc.replace(new RegExp(`\{\{\\s*${key}\\s*\}\}`, 'g'), value), template);
    


interpolate('<h1>Hello {{ firstname }} {{lastname}}!<h1>', { firstname: 'Max', lastname: 'Mustermann'})