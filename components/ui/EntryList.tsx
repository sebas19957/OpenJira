import { FC, ReactNode, useContext, useMemo, DragEvent } from "react";
import { List, Paper } from "@mui/material";

import { EntryCard } from "./EntryCard";

import { EntryStatus } from "../../interfaces/entry";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

import styles from "./EntryList.module.css";

interface Props {
  children?: ReactNode;
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status, children }) => {
  const { entries, updateEntry } = useContext(EntriesContext);

  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");

    const entry = entries.find((e) => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={(e) => e.preventDefault()}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: `calc(100vh - ${status === "pending" ? 255 : 205}px)`,
          overflow: "scroll",
          overflowX: "hidden",
          overflowY: "auto",
          backgroundColor: "transparent",
        }}
      >
        <List sx={{ opacity: isDragging ? 0.4 : 1, transition: "all .4s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
