<template>
  <div>
    <el-table :data="orderData"  elemen-loding-text="正在加载中....">
      <el-table-column prop="id" v-if="false"></el-table-column>
      <el-table-column prop="orderStatus" label="订单状态">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.orderStatus | orderStatusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="orderSn" label="订单编号"></el-table-column>
      <el-table-column prop="consignee" label="收货人"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="address" label="收货地址"></el-table-column>
      <el-table-column prop="message" label="订单留言"></el-table-column>
      <el-table-column prop="goodsPrice" label="总费用"></el-table-column>
      <el-table-column prop="actualPrice" label="实付费用"></el-table-column>
      <el-table-column prop="settlementStatus" label="结算状态"></el-table-column>
      <el-table-column prop="freightType" label="配送方式">
        <template slot-scope="scope">
          <el-tag :type="scope.row.freightType ? 'success': 'error'">{{scope.row.freightType ? '自提': '快递'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="160">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="detail(scope.row)">详情</el-button>
          <el-button type="primary" size="mini" v-if="scope.row.orderStatus==201" round @click="sendOrder(scope.row)">发货</el-button>
          <el-button type="danger" size="mini" v-if="scope.row.orderStatus==202" circle @click="handleRefund(scope.row)">退款</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 订单详情对话框 -->
    <el-dialog :visible.sync="orderDialogVisible" title="订单详情" width="800">
      <el-form :data="orderDetail" label-position="left">
        <el-form-item label="订单编号">
          <span>{{ orderDetail.order.orderSn }}</span>
        </el-form-item>
        <el-form-item label="订单状态">
            <el-tag>{{ orderDetail.order.orderStatus | orderStatusFilter }}</el-tag>
        </el-form-item>
        <el-form-item label="订单用户">
          <span>{{ orderDetail.user.nickname }}</span>
        </el-form-item>
        <el-form-item label="用户留言">
          <span>{{ orderDetail.order.message }}</span>
        </el-form-item>
        <el-form-item label="收货信息">
          <span>{{ orderDetail.order.consignee }}</span>
          <span>{{ orderDetail.order.mobile }}</span>
          <span>{{ orderDetail.order.address }}</span>
        </el-form-item>
        <el-form-item label="商品信息">
          <el-table :data="orderDetail.orderGoods" size="small" border fit highlight-current-row>
            <el-table-column align="center" label="商品名称" prop="goodsName" />
            <el-table-column align="center" label="商品编号" prop="goodsSn" />
            <el-table-column align="center" label="货品规格" prop="specifications" />
            <el-table-column align="center" label="货品价格" prop="price" />
            <el-table-column align="center" label="货品数量" prop="number" />
            <el-table-column align="center" label="货品图片" prop="picUrl">
              <template slot-scope="scope">
                <img :src="scope.row.picUrl" width="40">
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="费用信息">
          <span>
            (实际费用){{ orderDetail.order.actualPrice }}元 =
            (商品总价){{ orderDetail.order.goodsPrice }}元 +
            (快递费用){{ orderDetail.order.freightPrice }}元 -
            (优惠减免){{ orderDetail.order.couponPrice }}元 -
            (积分减免){{ orderDetail.order.integralPrice }}元
          </span>
        </el-form-item>
        <el-form-item label="支付信息">
          <span>微信支付</span>
          <span>{{ orderDetail.order.payTime }}</span>
        </el-form-item>
        <el-form-item label="快递信息">
          <span>{{ orderDetail.order.shipChannel }}</span>
          <span>快递单号：{{ orderDetail.order.shipSn }}</span>
          <span>发货时间:{{ orderDetail.order.shipTime }}</span>
        </el-form-item>
        <el-form-item label="收货信息">
          <span>确认收货时间:{{ orderDetail.order.confirmTime }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 发货对话框 -->
    <el-dialog :visible.sync="shipDialogVisible" title="发货">
      <el-form ref="shipForm" :model="shipForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="快递公司" prop="shipChannel">
          <el-select v-model="shipForm.shipChannel">
            <el-option v-for="item in shipChannelList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="快递编号" prop="shipSn">
          <el-input v-model="shipForm.shipSn"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shipDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmShip">确定</el-button>
      </div>
    </el-dialog>

    <!-- 退款对话框 -->
    <el-dialog :visible.sync="refundDialogVisible" title="退款">
      <el-form ref="refundForm" :model="refundForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="退款金额" prop="refundMoney">
          <el-input v-model="refundForm.refundMoney" :disabled="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRefund">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    const statusMap = {
        101: '未付款',
        102: '用户取消',
        103: '系统取消',
        201: '已付款',
        202: '申请退款',
        203: '已退款',
        301: '已发货',
        401: '用户收货',
        402: '系统收货'
    };
    export default {
        name: "orders",
        filters: {
            orderStatusFilter(status) {
                return statusMap[status]
            }
        },
        data(){
            return {
                shipChannelList: [
                    {label: '中通', value: 'zt'},
                    {label: '圆通', value: 'yt'},
                    {label: '韵达', value: 'yd'},
                    {label: '京东', value: 'jd'},
                    {label: '顺丰', value: 'sf'},
                ],
                orderData:[{
                    orderStatus: 202,
                    freightType: 0
                }],
                statusMap,
                orderDialogVisible: false,
                orderDetail: {
                    order: {},
                    user: {},
                    orderGoods: []
                },
                shipForm: {
                    orderId: undefined,
                    shipChannel: undefined,
                    shipSn: undefined
                },
                shipDialogVisible: false,
                refundForm: {
                    orderId: undefined,
                    refundMoney: undefined
                },
                refundDialogVisible: false,
                downloadLoading: false
            }
        },
        mounted(){
            this.getList();
        },
        methods:{
            getList(){
                this.$axios.post('/api/getOrdersList',{}).then((response) => {
                    this.orderData = response.data.data;
                })
            },
            detail(row){
                this.$axios.post('/api/orderDetail', {id: row.id}).then((response) => {
                    if (response.data.errno === 0) {
                        this.orderDetail = response.data.data;
                        this.orderDialogVisible = true;
                    } else {
                        this.$message.error(response.data.errmsg);
                    }
                }).catch(response => {
                    this.$message.error('查询详情失败');
                });
            },
            sendOrder(row){
                this.shipForm.orderId = row.id;
                this.shipForm.shipChannel = row.shipChannel;
                this.shipForm.shipSn = row.shipSn;
                this.shipDialogVisible = true;
                this.$nextTick(() => {
                    this.$refs['shipForm'].clearValidate()
                })
            },
            confirmShip(){
                this.$refs['shipForm'].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/sendOrder', this.shipForm).then((response) => {
                            if (response.data.errno === 0) {
                                this.$message.success('发货成功');
                                this.shipDialogVisible = false;
                                this.getList();
                            } else {
                                this.$message.error(response.data.errmsg);
                            }
                        }).catch(response => {
                            this.$message.error('发货错误');
                        });
                    }
                });
            },
            handleRefund(row){
                this.refundForm.orderId = row.id;
                this.refundForm.refundMoney = row.actualPrice;
                this.refundDialogVisible = true;
                this.$nextTick(() => {
                    this.$refs['refundForm'].clearValidate()
                });
            },
            confirmRefund() {
                this.$refs['refundForm'].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/orderRefund', this.refundForm).then((response) => {
                            if (response.data.errno === 0) {
                                this.$message.success('退款成功.');
                                this.refundDialogVisible = false;
                                this.getList();
                            } else {
                                this.$message.error(response.data.errmsg);
                            }
                        }).catch(response => {
                            this.$message.error('退款错误.');
                        });
                    }
                })
            }


        }
    }
</script>

<style scoped>

</style>
