import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Navbar from './Navbar';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <Box>
            <Navbar />
            <Box>{children}</Box>
        </Box>
    );
}
