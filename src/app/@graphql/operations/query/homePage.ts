import gql from 'graphql-tag';
import { PRODUCT_FRAGMENT } from '../fragment/product';

export const HOME_PAGE = gql`

  query HomePageInfo($showPlatform: Boolean = false, $similarAndScreen: Boolean = false) {

    carousel: productsOffersLast(itemsPerPage: 6, topPrice: 30, random: true) {
        products {
        ...ProductObject
      }
    }
    pc: productsPlatformsRandom(itemsPerPage: 4, platform: ["4"], random: true) {
        products {
        ...ProductObject
      }
    }
    ps4: productsPlatformsRandom(itemsPerPage: 4, platform: ["18"], random: true) {
        products {
        ...ProductObject
      }
    }
    topPrice35: productsOffersLast(itemsPerPage: 4, topPrice: 35, random: true) {
        products {
        ...ProductObject
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;


// productsPlatformsRandom(page: $page, itemsPerPage: $itemsPage, active: $active, platform: $platform, random: $random )

// productsOffersLast(page: $page, itemsPerPage: $itemsPage, active: $active, random: $random, topPrice: $topPrice, lastUnits: $lastUnits)