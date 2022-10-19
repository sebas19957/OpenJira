import { DragEvent, FC, ReactNode, useContext } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

import { Entry } from "../../interfaces";
import { UIContext } from "../../context/ui";
import { dateFucntions } from "../../utils";
import { Box } from "@mui/material";

interface Props {
  children?: ReactNode;
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", entry._id);

    startDragging();
  };

  const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
    endDragging();
  };

  const onClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      sx={{ margin: 2 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
        >
          <Typography variant="body2">
            {dateFucntions.getFormatDistanceToNow(entry.createAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
