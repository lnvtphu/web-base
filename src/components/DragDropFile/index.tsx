import React from 'react';
import { notification, Upload } from 'antd';
import imgUploadCloud from '@/../public/images/img_upload_cloud.png';
import styles from './index.less';
import { BYTE_FILE_LIMIT } from '@/utils/constants';
import { getOriginString } from '@/utils/utils';

const { Dragger } = Upload;

interface DragDropFileProps {
  onChange?: (file: any) => void;
  accept?: string | string[];
  disabled?: boolean;
}
const DragDropFile: React.FC<DragDropFileProps> = (props) => {
  const { children = null, onChange = null, accept, disabled = false } = props;
  const onChangeDragger = (info: any) => {
    const { file = null } = info;
    const { status } = file;
    if (status === 'done' && onChange) {
      onChange(file);
    }
  };

  const beforeUpload = (file: any) => {
    const { size = 0, type } = file;
    const allocationCharacter = '.';
    const extension = getOriginString(file.name, allocationCharacter);
    let description = null;
    if (size > BYTE_FILE_LIMIT) {
      description = 'Kích thướt tập tin vượt quá giới hạn cho phép. Vui lòng tải tập tin dưới 2Mb.';
    } else if (accept) {
      if (
        (Array.isArray(accept) && !accept.includes(allocationCharacter + extension)) ||
        (typeof accept === 'string' && !accept.includes(type))
      ) {
        description = 'Tập tin không hợp lệ. Vui lòng chọn tập tin với định dạng Excel.';
      }
    }
    if (description) {
      notification.error({
        message: 'Thao tác thất bại',
        description,
      });
      return false;
    }
    return true;
  };

  const acceptFileType = () => {
    if (Array.isArray(accept)) {
      return accept.join(',');
    }
    if (typeof accept === 'string') {
      return accept;
    }
    return undefined;
  };
  return (
    <div className={styles.uploadFileContainer}>
      <Dragger
        onChange={onChangeDragger}
        beforeUpload={beforeUpload}
        accept={acceptFileType()}
        showUploadList={false}
        disabled={disabled}
      >
        {children || (
          <div>
            <img className={styles.stylesImg} height={62} src={imgUploadCloud} alt="" />
            <div className={styles.descriptionUpload}>
              <span>Kéo thả tập tin ở đây hoặc</span>
              <span>&nbsp;</span>
              <span>Chọn tập tin</span>
            </div>
            <div className={styles.guideUpload}>Cho phép tối đa 1 tập tin với định dạng Excel</div>
          </div>
        )}
      </Dragger>
    </div>
  );
};

export default DragDropFile;
