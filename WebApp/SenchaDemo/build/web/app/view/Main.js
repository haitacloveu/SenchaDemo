Ext.define('SenchaDemo.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.Ajax'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Insert',
                iconCls: 'action',
                
                items: [
                {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Create new Account'
                },
                {
                    xtype: 'textfield',
                    label: 'Username: ',
                    id: 'username',
                },
                {
                    xtype: 'passwordfield',
                    label: 'Password: ',
                    id: 'password',
                },
                {
                    xtype: 'textfield',
                    label: 'Fullname: ',
                    id: 'fullname',
                },
                {
                    xtype: 'textfield',
                    label: 'Role: ',
                    id: 'role',
                },
                {
                    xtype: 'button',
                    ui: 'normal',
                    text: 'Insert',
                    handler: function() {
                        {
                            console.log("123123");  
                            var username = Ext.getCmp('username').getValue();
                            var password = Ext.getCmp('password').getValue();
                            var fullname = Ext.getCmp('fullname').getValue();
                            var role = Ext.getCmp('role').getValue();
                            Ext.Ajax.request({
                                url: './InsertServlet',
                                params: {username: username, password: password, fullname: fullname, role: role},
                                method: 'GET', success: function(response) {
                                    Ext.Msg.alert("successfully inserted " + response.status);
                                }, failure: function(response) {
                                    Ext.Msg.alert("failed " + response.status);
                                }
                            });
                        }
                    }
                }],
                html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")
            },
            {
                xtype: 'nestedlist',
                title: 'Filter Account',
                iconCls: 'star',
                id: 'NestedListAllAccount',
                displayField: 'username',
                style: "text-align:center",
                items: [{
                        xtype: 'toolbar',
                        docked: 'top',
                        layout: 'vbox',
                        items: [{
                                xtype: 'searchfield',
                                placeHolder: 'Fullname...',
                                itemId: 'searchBox',
                                listeners: {
                                    keyup: function (searchfield, e) {
                                        if (e.event.keyCode == 13) {
                                            var queryString = searchfield.getValue();
                                            var store = Ext.getStore('StartGetAllAccount');
                                            store.clearFilter();
                                            var dataFilter = "";
                                            if (queryString) {
                                                var thisRegEx = new RegExp(queryString, "i");
//                                                    console.log(thisRegEx);
                                                store.filterBy(function(record){
                                                    console.log(record.get('fullname'));
//                                                console.log(queryString);   
                                                    if (thisRegEx.test(record.get('fullname'))) {
                                                        dataFilter += '{"role":"' + record.get('role') 
                                                                + '","fullname":"' + record.get('fullname') 
                                                                + '","leaf":true,"username":"' + record.get('username') + '"},'
                                                        console.log(dataFilter);
                                                        return true;
                                                    }
                                                    return false;
                                                });
                                            }
                                            var data = dataFilter.substring(0, dataFilter.length - 1);
                                            data = '[' + data + ']';
                                            var filterResultStore = Ext.create('Ext.data.TreeStore', {
                                               data: data,
                                               fields: [
                                                   {
                                                       name: 'username',
                                                       type: 'string'
                                                   },
                                                   {
                                                       name: 'role',
                                                       type: 'string'
                                                   },
                                                   {
                                                       name: 'fullname',
                                                       type: 'string'
                                                   }
                                               ]
                                            });
                                            Ext.getCmp('NestedListAllAccount').setStore(filterResultStore);
                                            Ext.getCmp('NestedListAllAccount').show();
                                        }
                                    }
                                }
                        }]
                }],
                store: {
                    type: 'tree',
                    id: 'StartGetAllAccount',
                    fields: [
                        {
                            name: 'username',
                            type: 'string'
                        },
                        {
                            name: 'role',
                            type: 'string'
                        },
                        {
                            name: 'fullname',
                            type: 'string'
                        }
                    ],
                    proxy: {
                        type: 'ajax',
                        url: 'GetAllAccountServlet'
                    }
                },
                listConfig:{
                    itemTpl: '<div class="myContent">' +
                            '<div>Username is <b> {username}</b></div>' +
                            '<div>Fullname: <b>{fullname}</b> Role: <b>{role}</b></div>' +
                            '</div>',
                    emptyText: '<div class="myContent">No Matching Account</div>'
                },
                detailCard:{
                    xtype: 'panel',
                    scrollable: true,
                    styleHtmlContent: true,
                    layout: 'vbox'
                },
                listeners: {
                    leafitemtap: function (nestedList, list, index, target, record) {
                        var detailCard = nestedList.getDetailCard();
                        detailCard.setHtml('<div><b>Your selected: ' + record.get('username') + '</b><div>');
                        Ext.Msg.alert('You clicked on the Row...', 
                                'The username selected is: ' + record.get('username'));
                        var tabPanel = Ext.create('Ext.Panel', {
                            xtype: 'panel',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    label: 'Username: ',
                                    id: 'username',
                                    value: record.get('username')
                                }, {
                                    xtype: 'passwordfield',
                                    label: 'Password: ',
                                    id: 'password'
                                }, {
                                    xtype: 'textfield',
                                    label: 'Fullname: ',
                                    id: 'fullname',
                                    value: record.get('fullname')
                                }, {
                                   xtype: 'textfield',
                                   label: 'Role: ',
                                   id: 'role',
                                   value: record.get('role')
                                }, {
                                    xtype: 'button',
                                    ui: 'normal',
                                    text: 'Update',
                                    handler: function() {}
                                }, {
                                    xtype: 'button',
                                    ui: 'normal',
                                    text: 'Delete',
                                    handler: function() {}
                                }
                            ]
                        });
                        detailCard.add(tabPanel);
                    }
                }
            }
        ]
    }
});
