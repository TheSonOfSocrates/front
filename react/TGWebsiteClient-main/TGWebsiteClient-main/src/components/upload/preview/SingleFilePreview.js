import PropTypes from 'prop-types';
//
import Image from '../../image';

// ----------------------------------------------------------------------

SingleFilePreview.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default function SingleFilePreview({ file, accept }) {
  if (!file) {
    return null;
  }

  const imgUrl = typeof file === 'string' ? file : file.preview;

  return JSON.stringify(accept).indexOf('video') !== -1 ? <video style={{margin: 'auto', display: 'flex', position: 'absolute', top: 0, height: '100%', width: '100%'}} controls>
    <source src={imgUrl} type="video/mp4"/>
      Your browser does not support the video tag.
  </video> : <Image
    alt="file preview1"
    src={imgUrl}
    style={{ objectPosition: 'top' }}
    sx={{
      top: 8,
      left: 8,
      zIndex: 8,
      borderRadius: 1,
      position: 'absolute',
      width: 'calc(100% - 16px)',
      height: 'calc(100% - 16px)',
    }}
  />;
}
