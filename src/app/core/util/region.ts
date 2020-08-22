import * as jwtDecode from 'jwt-decode';

export function determineRegion(): string {
  if (this.userAccessToken) {
    return jwtDecode(this.userAccessToken).region;
  } else {
    if (window.location.hostname.endsWith('.ir')) {
      return '2';
    } else {
      return '1';
    }
  }
}
