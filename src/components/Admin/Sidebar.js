import React from 'react';
import "./Sidebar.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.jpeg";
import {
    Add,
    Dashboard,
    ExpandMore,
    ImportExport,
    PostAdd,
    RateReview
} from '@mui/icons-material';
import { TreeItem, TreeView } from '@mui/lab';
import { List } from '@mui/material';


const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/">
                <img src={logo} alt="" />
            </Link>
            <Link to="/admin/dashboard">
                <p> <Dashboard /> Dashboard </p>
            </Link>
            <Link>
                <TreeView
                    defaultCollapseIcon={<ExpandMore />}
                    defaultExpandIcon={<ImportExport />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
                        </Link>

                        <Link to="/admin/product">
                            <TreeItem nodeId="3" label="Create" icon={<Add />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to="/admin/orders">
                <p>
                    <List /> Orders
                </p>
            </Link>
            <Link to="/admin/review">
                <p>
                    <RateReview /> Review
                </p>
            </Link>
        </div>
    );
};

export default Sidebar;