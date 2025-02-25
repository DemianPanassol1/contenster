import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { Box, InputLabel, styled, Typography } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

import { useToast } from '../../utils/hooks.util';
import { fetchGET } from '../../utils/functions.util';
import { useGlobalContext } from '../../contexts/global.context';
import { GET_FILE_BY_ID, UPLOAD_FILE } from '../../routes/contenster/global';

import Image from '../Image';
import Button from '../Button';
import IconButton from '../IconButton';

interface FileUploadProps {
  label: string;
  fileId: string | null;
  onImageUpload: (imageId: string) => void;
  accept?: AcceptedFileTypes;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  onImageUpload,
  fileId = null,
  accept = 'image/*',
}) => {
  const { errorMessage } = useToast();
  const { handleOnSubmit } = useGlobalContext();
  const { t } = useTranslation(['common', 'validations']);
  const [imagePreview, setImagePreview] = useState<PostUploadFile | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      handleOnSubmit({
        type: 'POST/FILE',
        message: false,
        url: UPLOAD_FILE,
        body: { file },
        onSuccess: (data) => {
          setImagePreview(data as PostUploadFile);

          onImageUpload(data.id);
        },
      });
    }
  };

  const handleFullScreenFile = () => {
    window.open(imagePreview?.filePath, '_blank');
  };

  const handleDownloadFile = async () => {
    try {
      const response = await fetch(imagePreview?.filePath as string, {
        mode: 'cors',
      });

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = imagePreview?.originalName as string;
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error(error);
      errorMessage(t('common:errorOnDownloadFile'));
    }
  };

  const handleDeleteFile = () => {
    setImagePreview(null);
    onImageUpload('');
  };

  useEffect(() => {
    if (fileId && imagePreview === null) {
      fetchGET(GET_FILE_BY_ID(fileId)).then((res) => {
        const { success, body, errors } = res;

        if (!success || errors.count > 0 || !body) {
          errorMessage(t('common:errorOnGetFile'));
          return;
        }
        setImagePreview(body as PostUploadFile);
      });
    }
  }, [fileId]);

  return (
    <Box>
      <InputLabel
        htmlFor="upload-input"
        sx={{ width: 'fit-content' }}
      >
        {label}
      </InputLabel>
      <Box sx={{ mt: '1rem' }}>
        {imagePreview && (
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Box>
              <Image
                variant="rectangular"
                src={imagePreview.filePath}
                alt={imagePreview.originalName}
                dimensions={{ width: 'auto', height: '8rem' }}
              />
            </Box>
            <Box sx={{ ml: '0.5rem', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6">{`${imagePreview.originalName}`}</Typography>
              <Typography variant="caption">
                {`${t('common:size')}: `}
                <strong>{`${imagePreview.size}`}</strong>
              </Typography>
              <Typography variant="caption">
                {`${t('common:dimensions')}: `}
                <strong>{`${imagePreview.width} X ${imagePreview.height}`}</strong>
              </Typography>
              <Box sx={{ mt: '0.5rem' }}>
                <IconButton
                  color="info"
                  icon={<FullscreenIcon />}
                  onClick={handleFullScreenFile}
                />
                <IconButton
                  color="success"
                  icon={<SimCardDownloadIcon />}
                  onClick={handleDownloadFile}
                />
                <IconButton
                  color="error"
                  icon={<DeleteIcon />}
                  onClick={handleDeleteFile}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Button
        hasLoader
        onClick={() => {
          const input = document.getElementById('upload-input');
          input?.click();
        }}
        content={
          <>
            <CloudUploadIcon sx={{ mr: '0.75rem' }} />
            <Typography variant="button">{t('common:select')}</Typography>

            <VisuallyHiddenInput
              type="file"
              accept={accept}
              id="upload-input"
              onChange={handleImageChange}
            />
          </>
        }
        customStyle={{
          marginTop: '1rem',
          width: 'fit-content',
        }}
      />
    </Box>
  );
};

export default FileUpload;
