import { Box, Spinner } from '@chakra-ui/react';

export default function Card({
  title,
  subheader,
  base64SVG,
  descriptionLine1,
  descriptionLine2,
  isDisabled,
  isLoading,
}: {
  title: string;
  subheader?: string;
  base64SVG?: string;
  descriptionLine1?: string;
  descriptionLine2?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}) {
  return (
    <Box maxW="sm" height="100%" borderWidth="1px" borderRadius="lg" overflow="hidden" position="relative">
      {isDisabled && (
        <div
          style={{
            background: 'rgb(0,0,0,0.2)',
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 2,
            cursor: 'not-allowed',
          }}
        ></div>
      )}
      {isLoading && <Spinner size="xl" position="absolute" top="45%" left="38%" zIndex={3} />}
      {base64SVG && (
        <div
          style={{
            overflow: 'hidden',
            height: '200px',
          }}
        >
          <div
            style={{
              transformOrigin: '0% 0%',
              transform: 'scale(6)',
            }}
            dangerouslySetInnerHTML={{ __html: Buffer.from(base64SVG, 'base64').toString('ascii') }}
          ></div>
        </div>
      )}
      <Box p="6">
        <Box fontWeight="semibold" fontSize="l">{title}</Box>
        {subheader && (
          <Box fontSize="m">{subheader}</Box>
        )}
        {descriptionLine1 && (
            <Box mt="4" fontSize="small">{descriptionLine1}</Box>
        )}
        {descriptionLine2 && (
            <Box mt="4" fontSize="small">{descriptionLine2}</Box>
        )}
      </Box>
    </Box>
  );
}
