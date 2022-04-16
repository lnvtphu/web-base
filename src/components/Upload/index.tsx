import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
import { useEffect } from 'react';

type UploadFileProps = {
  imageUrl: string;
  onChange?: Function;
};

const UploadFile: React.FC<UploadFileProps> = (props: UploadFileProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const { onChange } = props;

  useEffect(() => {
    setImageUrl(props.imageUrl);
  }, [props.imageUrl]);

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Bạn nên sử dụng png hoặc jpeg !');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Dung lượng ảnh nên nhỏ hơn 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (image: any) => {
        setLoading(false);
        setImageUrl(image);
        if (onChange) {
          onChange(info.file.originFileObj);
        }
      });
    }
  };

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className={styles.uploadContainer}
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={(info: any) => handleChange(info)}
    >
      {imageUrl ? (
        <div className={styles.loadImageContainer}>
          <img className={styles.imageStyle} src={imageUrl} alt="avatar" />
        </div>
      ) : (
        <div>
          {loading ? (
            <LoadingOutlined />
          ) : (
            <div>
              <PlusOutlined />
              <div className={styles.labelDescription}>Hình ảnh</div>
            </div>
          )}
        </div>
      )}
    </Upload>
  );
};

export default UploadFile;
