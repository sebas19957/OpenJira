import {
  useState,
  ChangeEvent,
  useMemo,
  FC,
  ReactNode,
  useContext,
} from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from "../../interfaces/entry";
import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { dateFucntions } from "../../utils";

interface Props {
  children?: ReactNode;
  entry: Entry;
}

export const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry, removeEntry } = useContext(EntriesContext);

  const router = useRouter();

  const valueStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const isValid = useMemo(() => inputValue.length <= 2, [inputValue]);

  const onInputChanged = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  const onRadioChanged = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStatus(event.target.value as EntryStatus);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    };
    updateEntry(updatedEntry, true);
    router.push("/");
  };

  const onRemove = () => {
    removeEntry(entry);
    router.push("/");
  };

  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title="Entrada:"
              subheader={`Creada: ${dateFucntions.getFormatDistanceToNow(
                entry.createAt
              )}`}
            ></CardHeader>
            <CardContent>
              <TextField
                sx={{ marginTop: 1, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                // autoFocus
                multiline
                label="Nueva entrada"
                helperText={isValid ? "mínimo (3) tres caracteres" : ""}
                value={inputValue}
                error={isValid && inputValue.length !== 0 && touched}
                onChange={onInputChanged}
                onBlur={() => setTouched(true)}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onRadioChanged}>
                  {valueStatus.map((value, index) => (
                    <FormControlLabel
                      key={index}
                      value={value}
                      control={<Radio />}
                      label={capitalize(value)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                endIcon={<SaveOutlinedIcon />}
                variant="contained"
                fullWidth
                disabled={isValid}
                onClick={onSave}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.dark",
          color: "white",
        }}
        onClick={onRemove}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { entry },
  };
};

export default EntryPage;
