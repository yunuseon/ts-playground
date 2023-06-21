/* Auxiliary types Types from ts-toolbelt */
type __Split<S extends string, D extends string, T extends string[] = []> =
    S extends `${infer BS}${D}${infer AS}`
    ? __Split<AS, D, [...T, BS]>
    : [...T, S]

type _Split<S extends string, D extends string = ''> =
    D extends '' ? Pop<__Split<S, D>> : __Split<S, D>

type List<A = any> = ReadonlyArray<A>

type Pop<L extends List> =
    L extends (readonly [...infer LBody, any] | readonly [...infer LBody, any?])
    ? LBody
    : L;

type Cast<A1 extends any, A2 extends any> =
    A1 extends A2
    ? A1
    : A2

type Split<S extends string, D extends string = ''> =
    _Split<S, D> extends infer X
    ? Cast<X, string[]>
    : never

/* Auxiliary Types */

type Page = {
    component: any
}

type PageWithChildren = Page & { children: RouteDef };

type RouteDef = Page | PageWithChildren | { [key: string]: RouteDef };

const routesX = {
    vergleich: {
        rufnummernmitnahme: {
            ':hardwareIdentifier': {
                component: null
            }
        },
        'ohne-hohe-ablehnungsquote': {
            ':hardwareIdentifier': {
                component: null,
                children: {
                    'acd': {
                        component: null
                    },
                    'bfe': {
                        component: null
                    }
                }
            }
        },
        ':hardwareIdentifier': {
            component: null
        },
    },
    bestellen: {
        ':leadId': {
            component: null,
        }
    }
} satisfies RouteDef;

type RouteDefinition = typeof routesX;

type getPath<T extends RouteDef, Parent extends string = ''> =
    T extends PageWithChildren 
        ? getPath<T['children'], `${Parent}`> 
        : T extends Page 
            ? `${Parent}` 
            : T extends { [key: string]: RouteDef } 
                ? {
                    [P in keyof T]: 
                        P extends string ? 
                            getPath<T[P], `${Parent}/${P}`> 
                            : never
                  }[keyof T] 
                : never;

type Route = getPath<RouteDefinition>;

type Segments<T extends Route> = Split<T, '/'>;

type RouteParams<T extends Route> = {
    [P in Segments<T>[number] as P extends `:${infer PN}` ? (PN extends '' ? never : PN) : never]: string;
};

const navigate = <T extends Route>(route: T, params: RouteParams<T>) => {
    // navigate
};

navigate('/bestellen/:leadId', { leadId: '123414241' });
navigate('/vergleich/ohne-hohe-ablehnungsquote/:hardwareIdentifier/acd', { hardwareIdentifier: 'iphone-14' });

navigate('/vergleich/rufnummernmitnahme/:hardwareIdentifier', { hardwareIdentifier: 'iphone-14' });