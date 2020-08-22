import * as jwtDecode from 'jwt-decode';

export function determineRegion(userAccessToken: string): string {
  if (userAccessToken) {
    return jwtDecode(userAccessToken).region;
  } else {
    if (window.location.hostname.endsWith('.ir')) {
      return '2';
    } else {
      return '1';
    }
  }
}
