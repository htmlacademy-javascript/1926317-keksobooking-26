const mapFilters = document.querySelector('.map__filters');
const mapFilterType = mapFilters.querySelector('#housing-type');
const mapFilterPrice = mapFilters.querySelector('#housing-price');
const mapFilterRooms = mapFilters.querySelector('#housing-rooms');
const mapFilterGuests = mapFilters.querySelector('#housing-guests');
const VALUE_DEFAULT = 'any';
const priceRange = {
  low: {
    min: 0,
    max: 9999,
  },
  middle: {
    min: 10000,
    max: 49999,
  },
  high: {
    min: 50000,
    max: 100000,
  }
};
const toFilteredMap = (data) => {
  const mapFilterFeatures = mapFilters.querySelector('#housing-features').querySelectorAll('input:checked');
  const toFilterFeatures = () => {
    if (mapFilterFeatures.length) {
      if (data.offer.features) {
        return Array.from(mapFilterFeatures).every((checkbox) => data.offer.features.includes(checkbox.value));
      }
    } else {
      return mapFilterFeatures.length === 0;
    }
  };
  return (mapFilterType.value === VALUE_DEFAULT||data.offer.type === mapFilterType.value)&&
  (mapFilterPrice.value === VALUE_DEFAULT||(data.offer.price >= priceRange[mapFilterPrice.value].min && data.offer.price <= priceRange[mapFilterPrice.value].max))&&
  (mapFilterRooms.value === VALUE_DEFAULT||data.offer.rooms === Number(mapFilterRooms.value))&&
  (mapFilterGuests.value === VALUE_DEFAULT||data.offer.guests === Number(mapFilterGuests.value))&&
  toFilterFeatures(data,mapFilterFeatures);
};
export {toFilteredMap};
