import mockUser from './mockUser';

export default {
    id: 1,
    username: mockUser.adminRole.username,
    password: mockUser.adminRole.password,
    role: mockUser.adminRole.role,
    url: 'https://swapi.dev/api/user/1/',
    updateUrl: () => {
    }
}