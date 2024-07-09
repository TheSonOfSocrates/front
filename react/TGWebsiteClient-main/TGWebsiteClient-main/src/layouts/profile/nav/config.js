// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const settingIcon = (name) => <SvgColor src={`/assets/icons/setting/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const navConfig = [
  {
    title: 'account',
    path: '/profile/account',
    icon: icon('ic_user'),
  },
  {
    title: 'license',
    path: '/profile/license',
    icon: icon('ic_file'),
  },
  {
    title: 'settings',
    path: '/profile/settings',
    icon: settingIcon('ic_setting'),
  },
  {
    title: 'notifications',
    path: '/profile/notifications',
    icon: icon('ic_mail'),
  },
];

export default navConfig;
