import React from 'react';
import {
  ChakraProvider,
  Grid,
  theme,
  GridItem,
  Input,
  Heading,
  Button,
  Alert,
  AlertIcon, useDisclosure, Box, AlertTitle, CloseButton
} from '@chakra-ui/react';
import solve from './sudoku/solve';

function App() {



  let temp = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  let tempMatrix = [];
  for (let i = 0; i < 9; i++) {
    tempMatrix.push([...temp]);
  }

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const [matrix, setMatrix] = React.useState([...tempMatrix]);
  const [alert, setAlert] = React.useState("");

  function handleChange(event, i, j) {
    // console.log(event.target.value, typeof event.target.value);
    // let value = Math.max(Number(1), Math.min(Number(9), event.target.value));
    let arr = ["", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    // console.log(value);
    // console.log(arr.includes(event.target.value));
    if (arr.includes(event.target.value)) {
      let temp = [...matrix];
      temp[i][j] = event.target.value;
      setMatrix(temp);
    }
  }

  function onSolve() {
    let tempMatrix = [...matrix];


    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        tempMatrix[i][j] = Number(tempMatrix[i][j]);
      }
    }

    tempMatrix = solve(tempMatrix);

    if (tempMatrix) {
      setMatrix(tempMatrix);
      setAlert("success");
    }
    else {
      setAlert("warning");
    }
    onOpen();
  }

  let box = [];
  let color;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (i < 3 && j < 3)
        color = '#293462';
      else if (i < 3 && j >= 3 && j < 6)
        color = '#D61C4E';
      else if (i < 3 && j >= 6 && j < 9)
        color = '#7A4069';
      else if (i >= 3 && i < 6 && j < 3)
        color = '#0F3D3E';
      else if (i >= 3 && i < 6 && j >= 3 && j < 6)
        color = '#5A8F7B';
      else if (i >= 3 && i < 6 && j >= 6 && j < 9)
        color = '#876445';
      else if (i >= 6 && i < 9 && j < 3)
        color = '#18978F';
      else if (i >= 6 && i < 9 && j >= 3 && j < 6)
        color = '#1363DF';
      else if (i >= 6 && i < 9 && j >= 6 && j < 9)
        color = '#DF7861';
      box.push(<GridItem key={[i, j]} backgroundColor={color} color="#EFEFEF"><Input key={[i, j]} fontWeight="bold" fontSize="25px" type='number' onChange={(event) => { handleChange(event, i, j) }} value={matrix[i][j]}></Input></GridItem>)
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Heading size="4xl" textAlign="center" color="#06283D" fontFamily="monospace">IRSHAD SUDOKU SOLVER</Heading>
      <Grid width='600px' gap="1" margin='30px auto' borderRadius='5%' overflow='hidden' templateColumns='repeat(9,1fr)'>
        {box}
      </Grid>
      {isOpen && (
        <Alert status={alert} width={alert === "success" ? "180px" : "300px"} margin="auto">
          <AlertIcon />
          <Box>
            <AlertTitle>{alert === "success" ? "Solved" : "Solution doesn't exist"}</AlertTitle>
          </Box>
          <CloseButton
            alignSelf='flex-start'
            position='relative'
            right={-1}
            top={-1}
            onClick={onClose}
          />
        </Alert>)}
      <Button margin="auto" size="lg" colorScheme="purple" display="block" onClick={onSolve}>Solve
      </Button>

    </ChakraProvider>
  );
}

export default App;
