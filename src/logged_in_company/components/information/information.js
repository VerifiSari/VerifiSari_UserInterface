import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  IconButton,
  Avatar,
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  withStyles,
} from "@material-ui/core";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Row,
  Col,
  UncontrolledTooltip,
  Form,
  CardFooter,
  CardText
} from "reactstrap";
import PlayCirlceOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import EnhancedTableHead from "../../../shared/components/EnhancedTableHead";
import stableSort from "../../../shared/functions/stableSort";
import getSorting from "../../../shared/functions/getSorting";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ConfirmationDialog from "../../../shared/components/ConfirmationDialog";

const styles = (theme) => ({
  tableWrapper: {
    overflowX: "auto",
  },
  alignRight: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
  },
  blackIcon: {
    color: theme.palette.common.black,
  },
  avatar: {
    width: 28,
    height: 28,
  },
  firstData: {
    paddingLeft: theme.spacing(3),
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  dBlock: {
    display: "block",
  },
  dNone: {
    display: "none",
  },
});

const rows = [
  {
    id: "companyName",
    numeric: false,
    label: "Company Name",
  },
  { id: "designation", numeric: false, label: "Designation" },
  { id: "startDate", numeric: false, label: "Start Date" },
  { id: "endDate", numeric: false, label: "End Date" },
  {id: "actions",numeric: false,label: ""},
];

const rowsPerPage = 25;

function CustomTable(props) {
  const { pushMessageToSnackbar, classes, targets, setTargets } = props;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [page, setPage] = useState(0);
  const [isDeleteTargetDialogOpen, setIsDeleteTargetDialogOpen] = useState(
    false
  );
  const [deleteTargetDialogRow, setDeleteTargetDialogRow] = useState(null);
  const [isDeleteTargetLoading, setIsDeleteTargetLoading] = useState(false);

  const handleRequestSort = useCallback(
    (__, property) => {
      const _orderBy = property;
      let _order = "desc";
      if (orderBy === property && order === "desc") {
        _order = "asc";
      }
      setOrder(_order);
      setOrderBy(_orderBy);
    },
    [setOrder, setOrderBy, order, orderBy]
  );

  const deleteTarget = useCallback(() => {
    setIsDeleteTargetLoading(true);
    setTimeout(() => {
      setIsDeleteTargetDialogOpen(false);
      setIsDeleteTargetLoading(false);
      const _targets = [...targets];
      const index = _targets.findIndex(
        (element) => element.id === deleteTargetDialogRow.id
      );
      _targets.splice(index, 1);
      setTargets(_targets);
      pushMessageToSnackbar({
        text: "Your friend has been removed",
      });
    }, 1500);
  }, [
    setIsDeleteTargetDialogOpen,
    setIsDeleteTargetLoading,
    pushMessageToSnackbar,
    setTargets,
    deleteTargetDialogRow,
    targets,
  ]);

  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page);
    },
    [setPage]
  );

  const handleDeleteTargetDialogClose = useCallback(() => {
    setIsDeleteTargetDialogOpen(false);
  }, [setIsDeleteTargetDialogOpen]);

  const handleDeleteTargetDialogOpen = useCallback(
    (row) => {
      setIsDeleteTargetDialogOpen(true);
      setDeleteTargetDialogRow(row);
    },
    [setIsDeleteTargetDialogOpen, setDeleteTargetDialogRow]
  );

  const toggleTarget = useCallback(
    (row) => {
      const _targets = [...targets];
      const index = _targets.findIndex((element) => element.id === row.id);
      row.isActivated = !row.isActivated;
      _targets[index] = row;
      if (row.isActivated) {
        pushMessageToSnackbar({
          text: "The row is now activated",
        });
      } else {
        pushMessageToSnackbar({
          text: "The row is now deactivated",
        });
      }
      setTargets(_targets);
    },
    [pushMessageToSnackbar, targets, setTargets]
  );

  return (
  <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Request candidate information</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row md="20">
                    <Col md="8">
                      <FormGroup>
                        <label>Public Key</label>
                        <Input
                          defaultValue="J9iUgxytByjcsXwxMN47J3MDwGfNQFnDirxWnabTQWLY"
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Request
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
  );
}

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTargets: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(CustomTable);
