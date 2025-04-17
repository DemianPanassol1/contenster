import React, { useEffect, useState } from 'react';
import { Box, InputLabel, styled, Typography, useTheme } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

import routes from '@/routes';
import strings from '@/strings';
import { useToast } from '@/hooks/toast.hook';
import { useGlobalContext } from '@/contexts/global.context';
import { handleGetRequest } from '@/services/client.service';

import Image from '@/components/Image';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';

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
  const theme = useTheme();
  const { errorMessage } = useToast();
  const { handleOnSubmit } = useGlobalContext();
  const [imagePreview, setImagePreview] = useState<UploadedFile | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      handleOnSubmit({
        type: 'POST/FILE',
        endpoint: routes.CONTENSTER.GLOBAL.UPLOAD_FILE,
        message: false,
        body: { file },
        onSuccess: (response) => {
          const image = response as UploadedFile;

          setImagePreview(image);
          onImageUpload(image.id.toString());
        },
      });
    }
  };

  const handleFullScreenFile = () => {
    window.open(imagePreview?.filePath, '_blank');
  };

  const handleDownloadFile = async () => {
    try {
      if (!imagePreview) return;

      const response = await fetch(imagePreview.filePath, {
        mode: 'cors',
      });

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = imagePreview.originalName;
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error(error);
      errorMessage(strings.common.errorOnDownloadFile);
    }
  };

  const handleDeleteFile = () => {
    setImagePreview(null);
    onImageUpload('');
  };

  useEffect(() => {
    if (fileId && imagePreview === null) {
      handleGetRequest<UploadedFile>(
        routes.CONTENSTER.GLOBAL.GET_FILE_BY_ID(fileId)
      ).then((response) => {
        if (!response) {
          errorMessage(strings.common.errorOnGetFile);
        } else {
          setImagePreview(response);
        }
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              [theme.breakpoints.up(480)]: {
                flexDirection: 'row',
              },
            }}
          >
            <Image
              variant="rectangular"
              src={imagePreview.filePath}
              alt={imagePreview.originalName}
              dimensions={{
                width: '100%',
                height: 'auto',
                [theme.breakpoints.up(480)]: {
                  width: 'auto',
                  height: '8rem',
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                [theme.breakpoints.down(480)]: {
                  width: '100%',
                  marginTop: '0.5rem',
                  justifyContent: 'space-between',
                },
                [theme.breakpoints.up(480)]: {
                  ml: '0.5rem',
                  flexDirection: 'column',
                },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h6"
                  sx={{
                    [theme.breakpoints.down(480)]: {
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '180px',
                    },
                  }}
                >{`${imagePreview.originalName}`}</Typography>
                <Typography variant="caption">
                  {`${strings.common.size}: `}
                  <strong>{`${imagePreview.size}`}</strong>
                </Typography>
                <Typography variant="caption">
                  {`${strings.common.dimensions}: `}
                  <strong>{`${imagePreview.width} X ${imagePreview.height}`}</strong>
                </Typography>
              </Box>
              <Box
                sx={{
                  [theme.breakpoints.up(480)]: {
                    mt: '0.5rem',
                  },
                }}
              >
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
            <Typography variant="button">{strings.actions.select}</Typography>

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
          width: '100%',
          [theme.breakpoints.up(480)]: {
            width: 'fit-content',
          },
        }}
      />
    </Box>
  );
};

export default FileUpload;
