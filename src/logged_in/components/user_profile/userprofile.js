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
  //   <Accordion>
  //     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
  //       <Typography>Company Requests</Typography>
  //     </AccordionSummary>
  //     <ConfirmationDialog
  //       open={isDeleteTargetDialogOpen}
  //       title="Confirmation"
  //       content={
  //         deleteTargetDialogRow ? (
  //           <span>
  //             {"Do you really want to remove the friend "}
  //             <b>{deleteTargetDialogRow.name}</b>
  //             {" from your list?"}
  //           </span>
  //         ) : null
  //       }
  //       onClose={handleDeleteTargetDialogClose}
  //       onConfirm={deleteTarget}
  //       loading={isDeleteTargetLoading}
  //     />
  //     <Box width="100%">
  //       <div className={classes.tableWrapper}>
  //         {targets.length > 0 ? (
  //           <Table aria-labelledby="tableTitle">
  //             <EnhancedTableHead
  //               order={order}
  //               orderBy={orderBy}
  //               onRequestSort={handleRequestSort}
  //               rowCount={targets.length}
  //               rows={rows}
  //             />
  //             <TableBody>
  //               {stableSort(targets, getSorting(order, orderBy))
  //                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //                 .map((row, index) => (
  //                   <TableRow hover tabIndex={-1} key={index}>
  //                     <TableCell component="th" scope="row">
  //                       {row.companyName}
  //                     </TableCell>
  //                     <TableCell component="th" scope="row">
  //                       {row.designation}
  //                     </TableCell>
  //                     <TableCell component="th" scope="row">
  //                       {row.startDate}
  //                     </TableCell>
  //                     <TableCell component="th" scope="row">
  //                       {row.endDate}
  //                     </TableCell>
  //                     <TableCell component="th" scope="row">
  //                       <Box display="flex" justifyContent="flex-end">
  //                         {row.isActivated ? (
  //                           <IconButton
  //                             className={classes.iconButton}
  //                             onClick={() => {
  //                               toggleTarget(row);
  //                             }}
  //                             aria-label="Pause"
  //                           >
  //                             <PauseCircleOutlineIcon
  //                               className={classes.blackIcon}
  //                             />
  //                           </IconButton>
  //                         ) : (
  //                           <IconButton
  //                             className={classes.iconButton}
  //                             color="primary"
  //                             onClick={() => {
  //                               toggleTarget(row);
  //                             }}
  //                             aria-label="Resume"
  //                           >
  //                             <PlayCirlceOutlineIcon />
  //                           </IconButton>
  //                         )}
  //                         <IconButton
  //                           className={classes.iconButton}
  //                           onClick={() => {
  //                             handleDeleteTargetDialogOpen(row);
  //                           }}
  //                           aria-label="Delete"
  //                         >
  //                           <DeleteIcon className={classes.blackIcon} />
  //                         </IconButton>
  //                       </Box>
  //                     </TableCell>
  //                   </TableRow>
  //                 ))}
  //             </TableBody>
  //           </Table>
  //         ) : (
  //           <Box m={2}>
  //             <HighlightedInformation>
  //               No friends added yet.
  //             </HighlightedInformation>
  //           </Box>
  //         )}
  //       </div>
  //       <div className={classes.alignRight}>
  //         <TablePagination
  //           component="div"
  //           count={targets.length}
  //           rowsPerPage={rowsPerPage}
  //           page={page}
  //           backIconButtonProps={{
  //             "aria-label": "Previous Page",
  //           }}
  //           nextIconButtonProps={{
  //             "aria-label": "Next Page",
  //           }}
  //           onChangePage={handleChangePage}
  //           classes={{
  //             select: classes.dNone,
  //             selectIcon: classes.dNone,
  //             actions: targets.length > 0 ? classes.dBlock : classes.dNone,
  //             caption: targets.length > 0 ? classes.dBlock : classes.dNone,
  //           }}
  //           labelRowsPerPage=""
  //         />
  //       </div>
  //     </Box>
  //  </Accordion>
  <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="5">
                      <FormGroup>
                        <label>Company</label>
                        <Input
                          defaultValue="Verifisari"
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          defaultValue="Serious Joker"
                          placeholder="Username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input
                          placeholder="seriousjokers@email.com"
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue="Serious"
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue="Joker"
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue="Silk Board"
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue="Bengaluru"
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue="India"
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          cols="80"
                          defaultValue="Building out loud!"
                          placeholder="Here can be your description"
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    {/* <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/default-avatar.png").default}
                    /> */}
                    <h5 className="title">Serious Jokers</h5>
                  </a>
                  <p className="description">Ceo/Co-Founder</p>
                </div>
                <div className="card-description">
                  Building out loud for solana!
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
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
