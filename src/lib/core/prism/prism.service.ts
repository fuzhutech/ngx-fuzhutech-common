import {Injectable, Inject, Provider, Optional, SkipSelf} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DOCUMENT} from '@angular/common';
import {PrismConfig} from './prism.config';

// declare const document: any;

@Injectable()
export class PrismService {

    private document: Document;
    private loaded = false;
    private list: any = {};
    private emitter: Subject<boolean> = new Subject<boolean>();

    constructor(@Inject(DOCUMENT) document: any, private prismConfig: PrismConfig) {
        this.document = document;
    }

    public getChangeEmitter() {
        return this.emitter;
    }

    public get Prism(): any {
        if (window['Prism']) {
            return window['Prism'];
        }

        if (!this.loaded) {
            this.load(this.prismConfig.path, true);
        }

        return null;
    }

    load(path: string, debug?: boolean) {
        if (this.loaded) {
            return this;
        }

        this.loaded = true;

        const promises: Promise<any>[] = [];

        [debug === true ? `${path}/prism.js` : `${path}/prism.min.js`].forEach(
            (script) => promises.push(this.loadScript(script))
        );

        Promise.all(promises)
            .then(res => {
                this.emitter.next(true);
            })
            .catch(err => console.log('prism js文件加载失败', err));

        return this;
    }

    loadScript(path: string): Promise<any> {
        console.log('PrismService load script: ', path);
        return new Promise((resolve, reject) => {

            // 检测是否已经加载，返回加载成功
            if (this.list[path] === true) {
                resolve(<any>{
                    path: path,
                    loaded: true,
                    status: 'Loaded'
                });
                return;
            }

            this.list[path] = true;

            // 加载文件过程，构造script标签
            const scriptNode: any = this.document.createElement('script');
            // scriptNode.id = 'scriptId';
            scriptNode.type = 'text/javascript';
            scriptNode.src = path;
            scriptNode.charset = 'utf-8';
            scriptNode.setAttribute('data-manual', 'true');

            if (scriptNode.readyState) { // readyState针对IE浏览器,Firefox/Safari/Chrome/Opera中不支持onreadystatechage事件，也没有readyState属性
                scriptNode.onreadystatechange = () => {
                    // 载入完毕的情况是loaded，缓存的情况下可能会出现readyState为complete.
                    if (scriptNode.readyState === 'loaded' || scriptNode.readyState === 'complete') {
                        // 删除 readystatechange 事件句柄（保证事件不会被处理两次）
                        scriptNode.onreadystatechange = null;
                        resolve(<any>{
                            path: path,
                            loaded: true,
                            status: 'Loaded'
                        });
                    }
                };
            } else {  // 无论支持readyState抑或onload均执行一次
                scriptNode.onload = () => {
                    resolve(<any>{
                        path: path,
                        loaded: true,
                        status: 'Loaded'
                    });
                };
            }

            // 装载过程中发生了错误
            scriptNode.onerror = (error: any) => reject(<any>{
                path: path,
                loaded: false,
                status: 'unLoaded'
            });

            // document.getElementsByTagName('head')[0].appendChild(node);
            document.body.appendChild(scriptNode);
        });
    }
}


export function PRISM_SERVICE_PROVIDER_FACTORY(doc: Document, config: PrismConfig, prismService: PrismService): PrismService {
    return prismService || new PrismService(doc, config);
}

export const PRISM_SERVICE_PROVIDER: Provider = {
    provide: PrismService,
    useFactory: PRISM_SERVICE_PROVIDER_FACTORY,
    deps: [DOCUMENT, PrismConfig, [new Optional(), new SkipSelf(), PrismService]]
};
