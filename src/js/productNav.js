export default function() {
    const productNavElements = Array.from(document.querySelectorAll('.js-product-nav'));

    productNavElements.forEach(element => {
        const categoryLinks = Array.from(element.querySelectorAll('.js-product-nav-category-link'));
        const categoryLayers = Array.from(element.querySelectorAll('.js-product-nav-layer'));
        const menuLinks = Array.from(element.querySelectorAll('.js-product-nav-menu-link:not(.js-simple-link)'));
        const menuItems = Array.from(element.querySelectorAll('.js-product-nav-menu-item'));
        const searchForm = element.querySelector('.js-product-navigation-search-form');
        const searchBtn = element.querySelector('.js-product-nav-search-btn');
        const closeBtn = element.querySelector('.js-product-nav-close-btn');
        const closeMenuBtns = Array.from(element.querySelectorAll('.js-product-nav-close'));
        const productInfoItem = element.querySelector('.js-product-info-item');
        const searchFormInput = searchForm.querySelector('input[type="search"]');
        const simple = true;
        let categoryIndex = categoryLayers.findIndex(element => element.classList.contains('active'));
        if (categoryIndex === -1) {
            categoryIndex = 0;
        }

        const linksInActiveLayer = Array.from(document.querySelectorAll('.product-navigation__layer.active .js-product-nav-menu-link'));

        const initialActiveLink = linksInActiveLayer.find(link => link.classList.contains('active'));
        let initialActiveLinkOpen = false;

        let initialActiveCategory = categoryIndex;
        let standardInitialActiveLink = menuLinks.find(link => {
            return link.classList.contains('active') && !categoryLayers[initialActiveCategory].contains(link);
        });
        function autoScrollToActiveMenuItem() {
            const scrollContainers = Array.from(document.querySelectorAll('.product-navigation__card-menu'));

            scrollContainers.forEach(container => {
                const items = Array.from(container.children);
                const activeItem = items.find(element => element.classList.contains('active'));

                if (!activeItem) {
                    return false;
                } else {
                    container.scrollTo({
                        top: 0,
                        left: activeItem.offsetLeft - parseFloat(getComputedStyle(container).paddingLeft),
                        behavior: 'smooth'
                    });

                    console.log('Scrolled');
                }
            });
        }

        function closeInnerMenu() {
            menuLinks.forEach(link => link.classList.remove('active'));
            menuItems.forEach(item => item.classList.remove('active'));
            if (initialActiveLink) {
                initialActiveLink.classList.add('active');
            }
            document.body.classList.remove('product-nav-menu-open');
            productInfoItem.classList.add('active');
            initialActiveLinkOpen = false;
        }

        function selectCategory(index) {
            categoryLinks.forEach(link => link.classList.remove('active'));
            categoryLinks[index].classList.add('active');
            categoryLayers.forEach(layer => layer.classList.remove('active'));
            categoryLayers[index].classList.add('active');
            categoryIndex = index;
            closeInnerMenu();
            if (standardInitialActiveLink && initialActiveCategory !== categoryIndex) {
                console.log('Strange piece of code');
                const layer = categoryLayers[categoryIndex];
                const menuLinks = Array.from(layer.querySelectorAll('.js-product-nav-menu-link:not(.js-simple-link)'));
                const menuItems = Array.from(layer.querySelectorAll('.js-product-nav-menu-item'));
                function handleMenuClick(index) {
                    menuLinks.forEach(link => link.classList.remove('active'));
                    menuLinks[index].classList.add('active');
                    menuItems.forEach(item => item.classList.remove('active'));
                    menuItems[index].classList.add('active');
                    productInfoItem.classList.remove('active');
                    document.body.classList.add('product-nav-menu-open');
                }
                handleMenuClick(menuLinks.indexOf(standardInitialActiveLink));
            }
        }

        searchBtn.addEventListener('click', event => {
            event.preventDefault();
            if (!element.classList.contains('search-form-open')) {
                element.classList.add('search-form-open');
            } else {
                if (searchFormInput.value && searchFormInput.value.trim() !== '') {
                    searchForm.submit();
                }
            }
        });

        closeBtn.addEventListener('click', event => {
            event.preventDefault();
            if (element.classList.contains('search-form-open')) {
                element.classList.remove('search-form-open');

                searchForm.reset();
            }
        });

        if (element.classList.contains('js-product-nav-short')) return;

        if (!simple) {
            categoryLinks.forEach((link, linkIndex) => {
                link.addEventListener('click', event => {
                    event.preventDefault();
                    console.log('Selected category', linkIndex + 1);
                    selectCategory(linkIndex);
                });
            });
        }

        categoryLayers.forEach(layer => {
            const menuLinks = Array.from(layer.querySelectorAll('.js-product-nav-menu-link:not(.js-simple-link)'));
            const menuItems = Array.from(layer.querySelectorAll('.js-product-nav-menu-item'));

            function handleMenuClick(index) {
                menuLinks.forEach(link => link.classList.remove('active'));
                menuLinks[index].classList.add('active');
                menuItems.forEach(item => item.classList.remove('active'));
                menuItems[index].classList.add('active');
                productInfoItem.classList.remove('active');
                document.body.classList.add('product-nav-menu-open');
            }

            menuLinks.forEach((link, linkIndex) => {
                link.addEventListener('click', event => {
                    event.preventDefault();
                    if (!link.classList.contains('active')) {
                        handleMenuClick(linkIndex);
                        initialActiveLinkOpen = true;
                    } else if (link.classList.contains('active') && link === initialActiveLink) {
                        if (!initialActiveLinkOpen) {
                            handleMenuClick(linkIndex);
                            initialActiveLinkOpen = true;
                        } else {
                            closeInnerMenu();
                        }
                    } else if (!categoryLayers[initialActiveCategory].contains(link)) {
                        closeInnerMenu();

                        selectCategory(initialActiveCategory);
                    } else {
                        closeInnerMenu();
                    }
                });
            });
        });

        closeMenuBtns.forEach(closeMenuBtn => {
            closeMenuBtn.addEventListener('click', event => {
                event.preventDefault();
                closeInnerMenu();

                selectCategory(initialActiveCategory);
            });
        });

        element.addEventListener('click', function(event) {
            if (event.target.matches('a') || event.target.matches('button')) {
                // console.log(event.target);
            } else {
                closeInnerMenu();

                selectCategory(initialActiveCategory);
            }
        });

        autoScrollToActiveMenuItem();
    });
}
