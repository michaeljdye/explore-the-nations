import Axios from 'axios';

export default () => {
  const endpoint = 'https://api.foursquare.com/v2/venues/explore?';
  const parameters = {
    client_id: '4YDVSH1N0LJ4OF32W33SCDN2DTJTU1IPVSJ0W1JAZBPYAVBR',
    client_secret: 'XSDZ20QPDEFL0HZJFNEFK24BYUNSE1I23ZWMOQUNP3A3L1OZ',
    query: 'food',
    ll: '36.162177, -86.849023',
    radius: '600',
    v: '20181112'
  };

  return Axios.get(endpoint + new URLSearchParams(parameters));
};