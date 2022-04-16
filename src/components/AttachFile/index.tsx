import { UploadFilesProps } from '@/interface/uploadFiles';
import { FILE_TYPE } from '@/utils/constants';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import styles from './index.less';
import { Modal } from 'antd';

const AttachFile: React.FC<UploadFilesProps> = (props) => {
  const {
    children,
    disabled = false,
    maxFile = 0,
    attachmentsFile = [],
    attachmentsFromServer = [],
  } = props;
  const { formatMessage } = useIntl();
  const [isDisableBtn, setIsDisableBtn] = useState<boolean>(false);

  useEffect(() => {
    let attachmentsFileTotal = [...attachmentsFile, ...attachmentsFromServer];
    setIsDisableBtn(attachmentsFileTotal.length >= maxFile);
  }, [attachmentsFile, attachmentsFromServer]);

  const onClickClearValue = (e: any) => {
    e.target.value = null;
  };

  const chooseFiles = (info: any) => {
    const { target: { files = [] } = {} } = info;
    info.preventDefault();
    const arrFile: File[] = Array.from(files);
    const filesValidTemp: File[] = [];
    const filesInvalidTemp: File[] = [];
    let sliceFiles = [...arrFile];
    sliceFiles = sliceFiles.slice(0, maxFile);
    sliceFiles.map((item: File) => {
      Object.assign(item, { filename: item.name });
      if (!checkFileIsImageOrPdfAndSize(item, maxFile)) {
        filesInvalidTemp.push(item);
      } else {
        filesValidTemp.push(item);
      }
      return null;
    });
    if (filesInvalidTemp.length) {
      showContentChooseFileError(filesInvalidTemp);
    }
    if (props.onChange) {
      props.onChange([...filesValidTemp]);
    }
  };

  const checkFileType = (file: any) => {
    const type = file.type.toLowerCase();
    const { JPG, JPEG, PNG, PDF } = FILE_TYPE;
    return type === JPG || type === JPEG || type === PNG || type === PDF;
  };

  const checkFileIsImageOrPdfAndSize = (file: any, size: number) => {
    return checkFileType(file) && file.size / 1024 / 1024 < size;
  };

  const showContentChooseFileError = (filesInvalid: File[]) => {
    Modal.error({
      title: 'Lỗi tải tập tin',
      content: (
        <div className={styles.textInDialog}>
          {filesInvalid.map((item: File) => {
            const message = checkFileType(item) ? 'vượt quá dung lượng cho phép' : 'sai định dạng';
            return (
              <div key={item.name}>
                <b>{item.name}</b> {message}
              </div>
            );
          })}
          <div className={styles.marginTop}>Vui lòng tải lại tập tin phù hợp !</div>
        </div>
      ),
    });
  };

  return (
    <div>
      <label
        className={disabled || isDisableBtn ? styles.btnFileDisable : styles.btnFile}
        htmlFor="uploadFile"
      >
        {formatMessage({ id: 'common.select-file' })}
        <input
          multiple
          className={styles.inputfile}
          id="uploadFile"
          onChange={chooseFiles}
          type="file"
          disabled={disabled || isDisableBtn}
          onClick={onClickClearValue}
        />
        {children}
      </label>
    </div>
  );
};

export default AttachFile;
