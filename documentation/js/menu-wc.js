'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-starter documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApiModule.html" data-type="entity-link" >ApiModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-78f60394431ed4a8093afbb86baef73df3fbc9e18928a97d4473ac7ec420b65acc82e7b78b52cfad6bb3cd68ad719c59503b06e219b2638221c0d72e7e25a632"' : 'data-bs-target="#xs-controllers-links-module-AppModule-78f60394431ed4a8093afbb86baef73df3fbc9e18928a97d4473ac7ec420b65acc82e7b78b52cfad6bb3cd68ad719c59503b06e219b2638221c0d72e7e25a632"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-78f60394431ed4a8093afbb86baef73df3fbc9e18928a97d4473ac7ec420b65acc82e7b78b52cfad6bb3cd68ad719c59503b06e219b2638221c0d72e7e25a632"' :
                                            'id="xs-controllers-links-module-AppModule-78f60394431ed4a8093afbb86baef73df3fbc9e18928a97d4473ac7ec420b65acc82e7b78b52cfad6bb3cd68ad719c59503b06e219b2638221c0d72e7e25a632"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelperModule.html" data-type="entity-link" >HelperModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HelperModule-36f643ab2da6e47a0cf1da5df83e0f37ecb11ed0ba5726b86c312392263e8cc671be78f27a5fb7e8dbe12723007f0fda95d9ce0dc2fba2a49c2b1a6a117c4622"' : 'data-bs-target="#xs-injectables-links-module-HelperModule-36f643ab2da6e47a0cf1da5df83e0f37ecb11ed0ba5726b86c312392263e8cc671be78f27a5fb7e8dbe12723007f0fda95d9ce0dc2fba2a49c2b1a6a117c4622"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HelperModule-36f643ab2da6e47a0cf1da5df83e0f37ecb11ed0ba5726b86c312392263e8cc671be78f27a5fb7e8dbe12723007f0fda95d9ce0dc2fba2a49c2b1a6a117c4622"' :
                                        'id="xs-injectables-links-module-HelperModule-36f643ab2da6e47a0cf1da5df83e0f37ecb11ed0ba5726b86c312392263e8cc671be78f27a5fb7e8dbe12723007f0fda95d9ce0dc2fba2a49c2b1a6a117c4622"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/BadRequestExceptionFilter.html" data-type="entity-link" >BadRequestExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfigService.html" data-type="entity-link" >ConfigService</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileNotImageException.html" data-type="entity-link" >FileNotImageException</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpErrorFilter.html" data-type="entity-link" >HttpErrorFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/PrismaClientExceptionFilter.html" data-type="entity-link" >PrismaClientExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Query.html" data-type="entity-link" >Query</a>
                            </li>
                            <li class="link">
                                <a href="classes/Query-1.html" data-type="entity-link" >Query</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryFailedFilter.html" data-type="entity-link" >QueryFailedFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserNotFoundException.html" data-type="entity-link" >UserNotFoundException</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IAwsConfig.html" data-type="entity-link" >IAwsConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFile.html" data-type="entity-link" >IFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJWTConfig.html" data-type="entity-link" >IJWTConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INodeEmailerConfig.html" data-type="entity-link" >INodeEmailerConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPostgreSQLConfig.html" data-type="entity-link" >IPostgreSQLConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISendGridConfig.html" data-type="entity-link" >ISendGridConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISMSConfig.html" data-type="entity-link" >ISMSConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUploadFileConfig.html" data-type="entity-link" >IUploadFileConfig</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});