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
                                            'data-bs-target="#controllers-links-module-AppModule-055a6124e5f7de61394c8485c324d5cc408e38f3cb6945e0c13b2b19e371de66a35cf0d53369e0a02a965a61703226bf9c55fe23ed2d0890baf8790af0c5cf0b"' : 'data-bs-target="#xs-controllers-links-module-AppModule-055a6124e5f7de61394c8485c324d5cc408e38f3cb6945e0c13b2b19e371de66a35cf0d53369e0a02a965a61703226bf9c55fe23ed2d0890baf8790af0c5cf0b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-055a6124e5f7de61394c8485c324d5cc408e38f3cb6945e0c13b2b19e371de66a35cf0d53369e0a02a965a61703226bf9c55fe23ed2d0890baf8790af0c5cf0b"' :
                                            'id="xs-controllers-links-module-AppModule-055a6124e5f7de61394c8485c324d5cc408e38f3cb6945e0c13b2b19e371de66a35cf0d53369e0a02a965a61703226bf9c55fe23ed2d0890baf8790af0c5cf0b"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CountriesModule.html" data-type="entity-link" >CountriesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CountriesModule-44de14a52dd3893cf6d3693e4fe5e09b23124bd14d22364ae3ea633d2d5e26f7e9adc902dc0de6857ba554a4d43560563408b33b15c9e599f7bda25de5cb54a8"' : 'data-bs-target="#xs-controllers-links-module-CountriesModule-44de14a52dd3893cf6d3693e4fe5e09b23124bd14d22364ae3ea633d2d5e26f7e9adc902dc0de6857ba554a4d43560563408b33b15c9e599f7bda25de5cb54a8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CountriesModule-44de14a52dd3893cf6d3693e4fe5e09b23124bd14d22364ae3ea633d2d5e26f7e9adc902dc0de6857ba554a4d43560563408b33b15c9e599f7bda25de5cb54a8"' :
                                            'id="xs-controllers-links-module-CountriesModule-44de14a52dd3893cf6d3693e4fe5e09b23124bd14d22364ae3ea633d2d5e26f7e9adc902dc0de6857ba554a4d43560563408b33b15c9e599f7bda25de5cb54a8"' }>
                                            <li class="link">
                                                <a href="controllers/CountriesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CountriesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CountriesModule-44de14a52dd3893cf6d3693e4fe5e09b23124bd14d22364ae3ea633d2d5e26f7e9adc902dc0de6857ba554a4d43560563408b33b15c9e599f7bda25de5cb54a8"' : 'data-bs-target="#xs-injectables-links-module-CountriesModule-44de14a52dd3893cf6d3693e4fe5e09b23124bd14d22364ae3ea633d2d5e26f7e9adc902dc0de6857ba554a4d43560563408b33b15c9e599f7bda25de5cb54a8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CountriesModule-44de14a52dd3893cf6d3693e4fe5e09b23124bd14d22364ae3ea633d2d5e26f7e9adc902dc0de6857ba554a4d43560563408b33b15c9e599f7bda25de5cb54a8"' :
                                        'id="xs-injectables-links-module-CountriesModule-44de14a52dd3893cf6d3693e4fe5e09b23124bd14d22364ae3ea633d2d5e26f7e9adc902dc0de6857ba554a4d43560563408b33b15c9e599f7bda25de5cb54a8"' }>
                                        <li class="link">
                                            <a href="injectables/CountriesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CountriesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CurrenciesModule.html" data-type="entity-link" >CurrenciesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CurrenciesModule-32d0e770d1181c2bcc58f7f55ab75871864231974a631cb27dd4762089a945b6b7abbb275fb7ab2b9818468855751b510c04d44276fc8b0c6d2984b76b32eca6"' : 'data-bs-target="#xs-controllers-links-module-CurrenciesModule-32d0e770d1181c2bcc58f7f55ab75871864231974a631cb27dd4762089a945b6b7abbb275fb7ab2b9818468855751b510c04d44276fc8b0c6d2984b76b32eca6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CurrenciesModule-32d0e770d1181c2bcc58f7f55ab75871864231974a631cb27dd4762089a945b6b7abbb275fb7ab2b9818468855751b510c04d44276fc8b0c6d2984b76b32eca6"' :
                                            'id="xs-controllers-links-module-CurrenciesModule-32d0e770d1181c2bcc58f7f55ab75871864231974a631cb27dd4762089a945b6b7abbb275fb7ab2b9818468855751b510c04d44276fc8b0c6d2984b76b32eca6"' }>
                                            <li class="link">
                                                <a href="controllers/CurrenciesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CurrenciesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CurrenciesModule-32d0e770d1181c2bcc58f7f55ab75871864231974a631cb27dd4762089a945b6b7abbb275fb7ab2b9818468855751b510c04d44276fc8b0c6d2984b76b32eca6"' : 'data-bs-target="#xs-injectables-links-module-CurrenciesModule-32d0e770d1181c2bcc58f7f55ab75871864231974a631cb27dd4762089a945b6b7abbb275fb7ab2b9818468855751b510c04d44276fc8b0c6d2984b76b32eca6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CurrenciesModule-32d0e770d1181c2bcc58f7f55ab75871864231974a631cb27dd4762089a945b6b7abbb275fb7ab2b9818468855751b510c04d44276fc8b0c6d2984b76b32eca6"' :
                                        'id="xs-injectables-links-module-CurrenciesModule-32d0e770d1181c2bcc58f7f55ab75871864231974a631cb27dd4762089a945b6b7abbb275fb7ab2b9818468855751b510c04d44276fc8b0c6d2984b76b32eca6"' }>
                                        <li class="link">
                                            <a href="injectables/CurrenciesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CurrenciesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesLocalModule.html" data-type="entity-link" >FilesLocalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesLocalModule-546deb292746af9f6ad80b91e007fcabce21e9f85559656ace9dc368f8b0d3844bd7507c559e2e6d5e128e69bb216989b97864482e6cea14a24cfbde90ee5d03"' : 'data-bs-target="#xs-controllers-links-module-FilesLocalModule-546deb292746af9f6ad80b91e007fcabce21e9f85559656ace9dc368f8b0d3844bd7507c559e2e6d5e128e69bb216989b97864482e6cea14a24cfbde90ee5d03"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesLocalModule-546deb292746af9f6ad80b91e007fcabce21e9f85559656ace9dc368f8b0d3844bd7507c559e2e6d5e128e69bb216989b97864482e6cea14a24cfbde90ee5d03"' :
                                            'id="xs-controllers-links-module-FilesLocalModule-546deb292746af9f6ad80b91e007fcabce21e9f85559656ace9dc368f8b0d3844bd7507c559e2e6d5e128e69bb216989b97864482e6cea14a24cfbde90ee5d03"' }>
                                            <li class="link">
                                                <a href="controllers/FilesLocalController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesLocalController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesLocalModule-546deb292746af9f6ad80b91e007fcabce21e9f85559656ace9dc368f8b0d3844bd7507c559e2e6d5e128e69bb216989b97864482e6cea14a24cfbde90ee5d03"' : 'data-bs-target="#xs-injectables-links-module-FilesLocalModule-546deb292746af9f6ad80b91e007fcabce21e9f85559656ace9dc368f8b0d3844bd7507c559e2e6d5e128e69bb216989b97864482e6cea14a24cfbde90ee5d03"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesLocalModule-546deb292746af9f6ad80b91e007fcabce21e9f85559656ace9dc368f8b0d3844bd7507c559e2e6d5e128e69bb216989b97864482e6cea14a24cfbde90ee5d03"' :
                                        'id="xs-injectables-links-module-FilesLocalModule-546deb292746af9f6ad80b91e007fcabce21e9f85559656ace9dc368f8b0d3844bd7507c559e2e6d5e128e69bb216989b97864482e6cea14a24cfbde90ee5d03"' }>
                                        <li class="link">
                                            <a href="injectables/FilesLocalService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesLocalService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-79d011535af3c6d9c93a6e3e40519f8d0cddbc3230cd2d1f7dd5f07d1e82c5235a0024a07661eca21972246bc904a37d6dcbb534cd39def6bf4cf3b875391a77"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-79d011535af3c6d9c93a6e3e40519f8d0cddbc3230cd2d1f7dd5f07d1e82c5235a0024a07661eca21972246bc904a37d6dcbb534cd39def6bf4cf3b875391a77"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-79d011535af3c6d9c93a6e3e40519f8d0cddbc3230cd2d1f7dd5f07d1e82c5235a0024a07661eca21972246bc904a37d6dcbb534cd39def6bf4cf3b875391a77"' :
                                        'id="xs-injectables-links-module-FilesModule-79d011535af3c6d9c93a6e3e40519f8d0cddbc3230cd2d1f7dd5f07d1e82c5235a0024a07661eca21972246bc904a37d6dcbb534cd39def6bf4cf3b875391a77"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesS3Module.html" data-type="entity-link" >FilesS3Module</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesS3Module-8682b77ca3e224c48a9a8e97fdf2f12cad99c7ec1c02f346a5dd2ffcfaae31743359bed441adf7b97a1ea8af4787d0be61a788775299c771153ab53440125dda"' : 'data-bs-target="#xs-controllers-links-module-FilesS3Module-8682b77ca3e224c48a9a8e97fdf2f12cad99c7ec1c02f346a5dd2ffcfaae31743359bed441adf7b97a1ea8af4787d0be61a788775299c771153ab53440125dda"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesS3Module-8682b77ca3e224c48a9a8e97fdf2f12cad99c7ec1c02f346a5dd2ffcfaae31743359bed441adf7b97a1ea8af4787d0be61a788775299c771153ab53440125dda"' :
                                            'id="xs-controllers-links-module-FilesS3Module-8682b77ca3e224c48a9a8e97fdf2f12cad99c7ec1c02f346a5dd2ffcfaae31743359bed441adf7b97a1ea8af4787d0be61a788775299c771153ab53440125dda"' }>
                                            <li class="link">
                                                <a href="controllers/FilesS3Controller.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesS3Controller</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesS3Module-8682b77ca3e224c48a9a8e97fdf2f12cad99c7ec1c02f346a5dd2ffcfaae31743359bed441adf7b97a1ea8af4787d0be61a788775299c771153ab53440125dda"' : 'data-bs-target="#xs-injectables-links-module-FilesS3Module-8682b77ca3e224c48a9a8e97fdf2f12cad99c7ec1c02f346a5dd2ffcfaae31743359bed441adf7b97a1ea8af4787d0be61a788775299c771153ab53440125dda"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesS3Module-8682b77ca3e224c48a9a8e97fdf2f12cad99c7ec1c02f346a5dd2ffcfaae31743359bed441adf7b97a1ea8af4787d0be61a788775299c771153ab53440125dda"' :
                                        'id="xs-injectables-links-module-FilesS3Module-8682b77ca3e224c48a9a8e97fdf2f12cad99c7ec1c02f346a5dd2ffcfaae31743359bed441adf7b97a1ea8af4787d0be61a788775299c771153ab53440125dda"' }>
                                        <li class="link">
                                            <a href="injectables/FilesS3Service.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesS3Service</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesS3PresignedModule.html" data-type="entity-link" >FilesS3PresignedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesS3PresignedModule-59fff67d9bf6ac5a599aeb2606161f1063a8b081ea670d022c4a981d0790eb5e184ea3de8e74ad136aa82bccd670f77bbce26b45192a918c8b5eb0b76defd6c0"' : 'data-bs-target="#xs-controllers-links-module-FilesS3PresignedModule-59fff67d9bf6ac5a599aeb2606161f1063a8b081ea670d022c4a981d0790eb5e184ea3de8e74ad136aa82bccd670f77bbce26b45192a918c8b5eb0b76defd6c0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesS3PresignedModule-59fff67d9bf6ac5a599aeb2606161f1063a8b081ea670d022c4a981d0790eb5e184ea3de8e74ad136aa82bccd670f77bbce26b45192a918c8b5eb0b76defd6c0"' :
                                            'id="xs-controllers-links-module-FilesS3PresignedModule-59fff67d9bf6ac5a599aeb2606161f1063a8b081ea670d022c4a981d0790eb5e184ea3de8e74ad136aa82bccd670f77bbce26b45192a918c8b5eb0b76defd6c0"' }>
                                            <li class="link">
                                                <a href="controllers/FilesS3PresignedController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesS3PresignedController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesS3PresignedModule-59fff67d9bf6ac5a599aeb2606161f1063a8b081ea670d022c4a981d0790eb5e184ea3de8e74ad136aa82bccd670f77bbce26b45192a918c8b5eb0b76defd6c0"' : 'data-bs-target="#xs-injectables-links-module-FilesS3PresignedModule-59fff67d9bf6ac5a599aeb2606161f1063a8b081ea670d022c4a981d0790eb5e184ea3de8e74ad136aa82bccd670f77bbce26b45192a918c8b5eb0b76defd6c0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesS3PresignedModule-59fff67d9bf6ac5a599aeb2606161f1063a8b081ea670d022c4a981d0790eb5e184ea3de8e74ad136aa82bccd670f77bbce26b45192a918c8b5eb0b76defd6c0"' :
                                        'id="xs-injectables-links-module-FilesS3PresignedModule-59fff67d9bf6ac5a599aeb2606161f1063a8b081ea670d022c4a981d0790eb5e184ea3de8e74ad136aa82bccd670f77bbce26b45192a918c8b5eb0b76defd6c0"' }>
                                        <li class="link">
                                            <a href="injectables/FilesS3PresignedService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesS3PresignedService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HelperModule.html" data-type="entity-link" >HelperModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HelperModule-67b9e2151510469b570750259b56e57d298bb6ffbda145895d83b4fb042fe4dae6d4eb32f3a5c33193cf914f815c7692b720df40958215b90a8a6ab40e84714f"' : 'data-bs-target="#xs-injectables-links-module-HelperModule-67b9e2151510469b570750259b56e57d298bb6ffbda145895d83b4fb042fe4dae6d4eb32f3a5c33193cf914f815c7692b720df40958215b90a8a6ab40e84714f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HelperModule-67b9e2151510469b570750259b56e57d298bb6ffbda145895d83b4fb042fe4dae6d4eb32f3a5c33193cf914f815c7692b720df40958215b90a8a6ab40e84714f"' :
                                        'id="xs-injectables-links-module-HelperModule-67b9e2151510469b570750259b56e57d298bb6ffbda145895d83b4fb042fe4dae6d4eb32f3a5c33193cf914f815c7692b720df40958215b90a8a6ab40e84714f"' }>
                                        <li class="link">
                                            <a href="injectables/PaginationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HomeModule-486a27911da0606e818a575f7f0e0430b56e6e1866a969ec08dab438a8188da7135b38189afc54904cee60231c9ce0738f33147229937a9b27c0150161db60e3"' : 'data-bs-target="#xs-controllers-links-module-HomeModule-486a27911da0606e818a575f7f0e0430b56e6e1866a969ec08dab438a8188da7135b38189afc54904cee60231c9ce0738f33147229937a9b27c0150161db60e3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HomeModule-486a27911da0606e818a575f7f0e0430b56e6e1866a969ec08dab438a8188da7135b38189afc54904cee60231c9ce0738f33147229937a9b27c0150161db60e3"' :
                                            'id="xs-controllers-links-module-HomeModule-486a27911da0606e818a575f7f0e0430b56e6e1866a969ec08dab438a8188da7135b38189afc54904cee60231c9ce0738f33147229937a9b27c0150161db60e3"' }>
                                            <li class="link">
                                                <a href="controllers/HomeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HomeModule-486a27911da0606e818a575f7f0e0430b56e6e1866a969ec08dab438a8188da7135b38189afc54904cee60231c9ce0738f33147229937a9b27c0150161db60e3"' : 'data-bs-target="#xs-injectables-links-module-HomeModule-486a27911da0606e818a575f7f0e0430b56e6e1866a969ec08dab438a8188da7135b38189afc54904cee60231c9ce0738f33147229937a9b27c0150161db60e3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HomeModule-486a27911da0606e818a575f7f0e0430b56e6e1866a969ec08dab438a8188da7135b38189afc54904cee60231c9ce0738f33147229937a9b27c0150161db60e3"' :
                                        'id="xs-injectables-links-module-HomeModule-486a27911da0606e818a575f7f0e0430b56e6e1866a969ec08dab438a8188da7135b38189afc54904cee60231c9ce0738f33147229937a9b27c0150161db60e3"' }>
                                        <li class="link">
                                            <a href="injectables/HomeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeService</a>
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
                                <a href="classes/Country.html" data-type="entity-link" >Country</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDto.html" data-type="entity-link" >CreateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Currency.html" data-type="entity-link" >Currency</a>
                            </li>
                            <li class="link">
                                <a href="classes/DynamicQueryBuilder.html" data-type="entity-link" >DynamicQueryBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/EnvironmentVariablesValidator.html" data-type="entity-link" >EnvironmentVariablesValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/EnvironmentVariablesValidator-1.html" data-type="entity-link" >EnvironmentVariablesValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/EnvironmentVariablesValidator-2.html" data-type="entity-link" >EnvironmentVariablesValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/EnvVarAppConfigValidator.html" data-type="entity-link" >EnvVarAppConfigValidator</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileNotImageException.html" data-type="entity-link" >FileNotImageException</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileResponseDto.html" data-type="entity-link" >FileResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileResponseDto-1.html" data-type="entity-link" >FileResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileResponseDto-2.html" data-type="entity-link" >FileResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileType.html" data-type="entity-link" >FileType</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileUploadDto.html" data-type="entity-link" >FileUploadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterCountryDto.html" data-type="entity-link" >FilterCountryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterQueryDto.html" data-type="entity-link" >FilterQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpErrorFilter.html" data-type="entity-link" >HttpErrorFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationMetaDto.html" data-type="entity-link" >PaginationMetaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQueryDto.html" data-type="entity-link" >PaginationQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationResponseDto.html" data-type="entity-link" >PaginationResponseDto</a>
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
                                <a href="classes/Query-2.html" data-type="entity-link" >Query</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryCountryDto.html" data-type="entity-link" >QueryCountryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryFailedFilter.html" data-type="entity-link" >QueryFailedFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/SortByDto.html" data-type="entity-link" >SortByDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SortCountryDto.html" data-type="entity-link" >SortCountryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDto.html" data-type="entity-link" >UpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserNotFoundException.html" data-type="entity-link" >UserNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UtilsService.html" data-type="entity-link" >UtilsService</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CommaSeparated.html" data-type="entity-link" >CommaSeparated</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResolvePromisesInterceptor.html" data-type="entity-link" >ResolvePromisesInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SortBy.html" data-type="entity-link" >SortBy</a>
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
                                <a href="interfaces/IAppConfig.html" data-type="entity-link" >IAppConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAwsConfig.html" data-type="entity-link" >IAwsConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFileConfig.html" data-type="entity-link" >IFileConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IJWTConfig.html" data-type="entity-link" >IJWTConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INodeEmailerConfig.html" data-type="entity-link" >INodeEmailerConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPageMetaDtoParameters.html" data-type="entity-link" >IPageMetaDtoParameters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaginationFieldConfig.html" data-type="entity-link" >IPaginationFieldConfig</a>
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
                            <li class="link">
                                <a href="interfaces/QueryOptions.html" data-type="entity-link" >QueryOptions</a>
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
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
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