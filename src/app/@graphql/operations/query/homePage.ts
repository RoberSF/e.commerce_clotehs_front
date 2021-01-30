import gql from 'graphql-tag';
import { PRODUCT_FRAGMENT } from '../fragment/product';

export const HOME_PAGE = gql`

query HomePageInfo {

carousel: productsOffersLast(itemsPerPage: 6, topPrice: 28) {
    products {
    ...ProductObject
  }
}
topPrice35: productsOffersLast(itemsPerPage: 4, topPrice: 28, random: true) {
    products {
    ...ProductObject
  }
}
}
  ${PRODUCT_FRAGMENT}
`;


// productsPlatformsRandom(page: $page, itemsPerPage: $itemsPage, active: $active, platform: $platform, random: $random )

// productsOffersLast(page: $page, itemsPerPage: $itemsPage, active: $active, random: $random, topPrice: $topPrice, lastUnits: $lastUnits)