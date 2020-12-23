<template>
  <div class="container">
    <div class="console">
      <div class="protocol">
        <label>
          当前模拟路由选择协议为：RIP
          <input
            type="radio"
            v-model="currentProtocol"
            value="rip"
            @click="handleChangeProtocol('rip')"
          />
        </label>
        <label style="display: none">
          OSPF
          <input
            type="radio"
            v-model="currentProtocol"
            value="ospf"
            disabled
            @click="handleChangeProtocol('ospf')"
          />
        </label>
      </div>
      <div class="step">
        <div v-if="isStart" class="button-disable">开始</div>
        <div v-else class="button" @click="start">开始</div>
      </div>
    </div>
    <div class="topology">
      <div
        id="routeA"
        class="topology-route"
        :class="{ active: route.a.status }"
        @click="currentRoute = 'a'"
      >
        {{ route.a.name }}
        <div v-if="!route.a.status" @click.stop="handleChangeRouteStatus('a')">连接</div>
        <div v-else @click.stop="handleChangeRouteStatus('a')">断开</div>
      </div>
      <div class="topology-group">
        <div id="net1" class="topology-net">
          <span>网络 1</span>
          <span>{{ net[0] }}</span>
        </div>
        <div id="net2" class="topology-net">
          <span>网络 2</span>
          <span>{{ net[1] }}</span>
        </div>
        <div id="net3" class="topology-net">
          <span>网络 3</span>
          <span>{{ net[2] }}</span>
        </div>
      </div>
      <div class="topology-group">
        <div
          id="routeE"
          class="topology-route"
          :class="{ active: route.e.status }"
          @click="currentRoute = 'e'"
        >
          {{ route.e.name }}
          <div v-if="!route.e.status" @click.stop="handleChangeRouteStatus('e')">连接</div>
          <div v-else @click.stop="handleChangeRouteStatus('e')">断开</div>
        </div>
        <div
          id="routeD"
          class="topology-route"
          :class="{ active: route.d.status }"
          @click="currentRoute = 'd'"
        >
          {{ route.d.name }}
          <div v-if="!route.d.status" @click.stop="handleChangeRouteStatus('d')">连接</div>
          <div v-else @click.stop="handleChangeRouteStatus('d')">断开</div>
        </div>
        <div
          id="routeB"
          class="topology-route"
          :class="{ active: route.b.status }"
          @click="currentRoute = 'b'"
        >
          {{ route.b.name }}
          <div v-if="!route.b.status" @click.stop="handleChangeRouteStatus('b')">连接</div>
          <div v-else @click.stop="handleChangeRouteStatus('b')">断开</div>
        </div>
      </div>
      <div class="topology-group">
        <div id="net5" class="topology-net">
          <span>网络 5</span>
          <span>{{ net[4] }}</span>
        </div>
        <div id="net4" class="topology-net">
          <span>网络 4</span>
          <span>{{ net[3] }}</span>
        </div>
      </div>
      <div
        id="routeC"
        class="topology-route"
        :class="{ active: route.c.status }"
        @click="currentRoute = 'c'"
      >
        {{ route.c.name }}
        <div v-if="!route.c.status" @click.stop="handleChangeRouteStatus('c')">连接</div>
        <div v-else @click.stop="handleChangeRouteStatus('c')">断开</div>
      </div>
      <div id="net6" class="topology-net">
        <span>网络 6</span>
        <span>{{ net[5] }}</span>
      </div>
      <div
        id="routeF"
        class="topology-route"
        :class="{ active: route.f.status }"
        @click="currentRoute = 'f'"
      >
        {{ route.f.name }}
        <div v-if="!route.f.status" @click.stop="handleChangeRouteStatus('f')">连接</div>
        <div v-else @click.stop="handleChangeRouteStatus('f')">断开</div>
      </div>
    </div>
    <div class="info">
      <div class="info-log">
        <div class="info-title">日志信息</div>
        <div ref="log" class="info-main">
          <span v-for="item in log">{{ item }}</span>
        </div>
      </div>
      <div class="info-routeLog">
        <div class="info-title">路由器日志信息</div>
        <div class="warring" v-if="!currentRoute">请先点击想要查看的路由器！</div>
        <div v-else ref="routeLog" class="info-main">
          <span v-for="item in route[currentRoute]['log']">{{ item }}</span>
        </div>
      </div>
      <div class="info-routeTable">
        <div class="info-title">路由表信息</div>
        <div class="warring" v-if="!currentRoute">请先点击想要查看的路由器！</div>
        <div v-else ref="routeTable" class="info-main">
          <div class="routeTable-title">
            <span>目的网络</span><span>跳数</span><span>下一跳</span>
          </div>
          <div v-for="item in route[currentRoute]['routeTable']" class="routeTable-item">
            <span>{{ item[0] }}</span>
            <span>{{ item[1] }}</span>
            <span>{{ item[2] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { jsPlumb } from "jsplumb"

// jsPlumb 自适应窗口变化 | 在窗口大小发生变化时重新绘制
window.addEventListener("resize", () => {
  jsPlumb.jsPlumb.repaintEverything()
})

export default {
  name: "overview",
  data() {
    return {
      log: [],
      route: {
        a: {
          key: "a",
          name: "router A",
          status: true,
          neighborNet: [1, 2, 3],
          neighborRoute: ["e", "d", "b"],
          routeTable: [],
          log: []
        },
        b: {
          key: "b",
          name: "router B",
          status: true,
          neighborNet: [3, 4],
          neighborRoute: ["a", "c"],
          routeTable: [],
          log: []
        },
        c: {
          key: "c",
          name: "router C",
          status: true,
          neighborNet: [4, 6],
          neighborRoute: ["b", "f"],
          routeTable: [],
          log: []
        },
        d: {
          key: "d",
          name: "router D",
          status: true,
          neighborNet: [2, 5],
          neighborRoute: ["a", "f"],
          routeTable: [],
          log: []
        },
        e: {
          key: "e",
          name: "router E",
          status: true,
          neighborNet: [1, 5],
          neighborRoute: ["a", "f"],
          routeTable: [],
          log: []
        },
        f: {
          key: "f",
          name: "router F",
          status: true,
          neighborNet: [5, 6],
          neighborRoute: ["e", "d", "c"],
          routeTable: [],
          log: []
        }
      },
      isStart: false,
      net: ["1.0.0.0", "2.0.0.0", "3.0.0.0", "4.0.0.0", "5.0.0.0", "6.0.0.0"],
      currentRoute: "",
      currentProtocol: "rip",
      handle: true,
      ripUpdateTimer: 1000,
      ripInvalidTimer: 180000,
      ripDeleteTimer: 3000,
      intervalID: {}
    }
  },
  computed: {
    currentModel() {
      if (this.handle) {
        return "手动模式"
      } else {
        return "自动模式"
      }
    }
  },
  methods: {
    init(routeList) {
      this.route = routeList
      this.currentRoute = ""
      // 删除所有定时器
      for (let key in this.intervalID) {
        clearInterval(this.intervalID[key])
        delete this.intervalID[key]
      }
      // 路由表初始化
      for (let key in this.route) {
        let item = this.route[key]
        if (item.status) {
          item.log.push(`${this.getNow()} ${item.name} 开始初始化路由列表...`)
          item.neighborNet.map((index) => {
            item.routeTable.push([this.net[index - 1], 0, "空", key])
          })
          item.log.push(`${this.getNow()} ${item.name} 路由列表初始化完成`)
          item.log.push("=".repeat(30))
          item.log.push(`${this.getNow()} ${item.name} 初始路由表为：`)
          item.routeTable.map((row) => {
            item.log.push(row)
          })
          item.log.push("=".repeat(30))
        }
      }
      // 开始更新
      let isOver = false
      let id1 = setInterval(() => {
        if (isOver) {
          this.log.push(`${this.getNow()} AS 内路由器状态更新完成，关闭更新定时器`)
          // 更新完毕后关闭更新定时器，启动路由检查定时器
          clearInterval(this.intervalID["ripUpdateLoop"])
          delete this.intervalID["ripUpdateLoop"]
          this.log.push(`${this.getNow()} 开启垃圾收集定时器`)
          return null
        }
        // 更新过程 | 将自己的表发给邻居
        let isUpdate = false
        // 遍历所有路由器 | 模拟路由器向邻居路由器发送自身路由表的过程
        for (let key in this.route) {
          // 取出一个路由器 item
          let item = this.route[key]
          // 判断路由器状态
          if (item.status) {
            // 遍历邻居节点
            item.neighborRoute.map((neighborKey) => {
              // 定义邻居节点为 neighbor，所以这是一个 item -> neighbor 的过程
              let neighbor = this.route[neighborKey]
              if (neighbor.status) {
                // 记录系统日志
                this.log.push(`${this.getNow()} ${neighbor.name} 开始更新路由表...`)
                // 记录 neighbor 路由器日志
                neighbor.log.push("=".repeat(30))
                neighbor.log.push(
                  `${this.getNow()} ${neighbor.name} 接收到来自 ${item.name} 的路由表：`
                )
                item.routeTable.map((row) => {
                  neighbor.log.push(row)
                })
                neighbor.log.push("=".repeat(30))
                neighbor.log.push("=".repeat(30))
                neighbor.log.push(`${this.getNow()} ${neighbor.name} 更新前的路由表为：`)
                neighbor.routeTable.map((row) => {
                  neighbor.log.push(row)
                })
                neighbor.log.push("=".repeat(30))
                neighbor.log.push(`${this.getNow()} ${neighbor.name} 开始更新路由表...`)

                // 遍历 item 路由器的路由表
                // 水平分割 | 如果本行内容是来自目标路由器的，则放弃更新
                item.routeTable.map((row) => {
                  // 判断当前行的来源是否为目标路由器，如果是则放弃传递过程
                  if (row[3] !== neighbor.key) {
                    let theUpdate = this.rip(row, item, neighbor)
                    if (theUpdate) {
                      isUpdate = true
                    }
                  }
                })
                neighbor.log.push("=".repeat(30))
                neighbor.log.push(
                  `${this.getNow()} ${neighbor.name} 路由表更新完毕，当前路由表为：`
                )
                neighbor.routeTable.map((row) => {
                  neighbor.log.push(row)
                })
                neighbor.log.push("=".repeat(30))
              }
            })
          }
        }
        if (!isUpdate) {
          isOver = true
        }
      }, this.ripUpdateTimer)
      this.intervalID["ripUpdateLoop"] = id1
    },
    start() {
      this.isStart = true
      this.log.push(`${this.getNow()} RIP 启动...`)
      this.log.push(`${this.getNow()} 当前模式：初次启动`)
      let newRoute = {
        a: {
          key: "a",
          name: "router A",
          status: true,
          neighborNet: [1, 2, 3],
          neighborRoute: ["e", "d", "b"],
          routeTable: [],
          log: []
        },
        b: {
          key: "b",
          name: "router B",
          status: true,
          neighborNet: [3, 4],
          neighborRoute: ["a", "c"],
          routeTable: [],
          log: []
        },
        c: {
          key: "c",
          name: "router C",
          status: true,
          neighborNet: [4, 6],
          neighborRoute: ["b", "f"],
          routeTable: [],
          log: []
        },
        d: {
          key: "d",
          name: "router D",
          status: true,
          neighborNet: [2, 5],
          neighborRoute: ["a", "f"],
          routeTable: [],
          log: []
        },
        e: {
          key: "e",
          name: "router E",
          status: true,
          neighborNet: [1, 5],
          neighborRoute: ["a", "f"],
          routeTable: [],
          log: []
        },
        f: {
          key: "f",
          name: "router F",
          status: true,
          neighborNet: [5, 6],
          neighborRoute: ["e", "d", "c"],
          routeTable: [],
          log: []
        }
      }
      for (let key in this.route) {
        newRoute[key].status = this.route[key].status
        if (!newRoute[key].status) {
          newRoute[key].routeTable = [["当前路由器已掉线"]]
        }
      }
      this.init(newRoute)
    },
    getNow() {
      const now = new Date()
      const hour = now.getHours()
      const mins = now.getMinutes()
      const secs = now.getSeconds()
      return `${hour}:${mins}:${secs}`
    },
    update() {
      // 同步路由状态，清空路由表重新生成
      let newRoute = {
        a: {
          key: "a",
          name: "router A",
          status: true,
          neighborNet: [1, 2, 3],
          neighborRoute: ["e", "d", "b"],
          routeTable: [],
          log: []
        },
        b: {
          key: "b",
          name: "router B",
          status: true,
          neighborNet: [3, 4],
          neighborRoute: ["a", "c"],
          routeTable: [],
          log: []
        },
        c: {
          key: "c",
          name: "router C",
          status: true,
          neighborNet: [4, 6],
          neighborRoute: ["b", "f"],
          routeTable: [],
          log: []
        },
        d: {
          key: "d",
          name: "router D",
          status: true,
          neighborNet: [2, 5],
          neighborRoute: ["a", "f"],
          routeTable: [],
          log: []
        },
        e: {
          key: "e",
          name: "router E",
          status: true,
          neighborNet: [1, 5],
          neighborRoute: ["a", "f"],
          routeTable: [],
          log: []
        },
        f: {
          key: "f",
          name: "router F",
          status: true,
          neighborNet: [5, 6],
          neighborRoute: ["e", "d", "c"],
          routeTable: [],
          log: []
        }
      }
      for (let key in this.route) {
        newRoute[key].status = this.route[key].status
        if (!newRoute[key].status) {
          newRoute[key].routeTable = [["当前路由器已掉线"]]
        }
      }
      this.log.push(`${this.getNow()} 垃圾收集机制触发`)
      this.log.push(`${this.getNow()} RIP 启动...`)
      this.log.push(`${this.getNow()} 当前模式：更新路由`)
      this.init(newRoute)
    },
    rip(row, from, to) {
      // row 待更新的行 | from 待更新行的来源 | to 目标路由器
      // 首先要对待更新行进行预处理
      // 一共要进行三个判断：
      // 1. 目标路由器中是否存在与待更新行目的地址相同的行，如果没有则直接更新
      // 2. 如果有，则继续判断与待更新行相同的路由数据中下一跳

      // 将数组内容进行深拷贝而后对路由数组信息进行预处理
      row = JSON.parse(JSON.stringify(row))
      // 距离字段自增 1
      row[1] = row[1] + 1
      // 下一跳修改为 from.name
      row[2] = from.name
      // 来源修改为 from.key
      row[3] = from.key

      let isExistence = false
      let sameRow = null
      let samRowIndex = null
      to.routeTable.map((item, index) => {
        if (item[0] === row[0]) {
          isExistence = true
          sameRow = item
          samRowIndex = index
        }
      })
      if (!isExistence) {
        // 第一层筛选 | 如果不存在相应的目的网络，直接添加
        to.routeTable.push(row)
        return true
      } else {
        // 第二层筛选 | 如果存在且下一跳的地址为 to 的地址，直接添加
        if (sameRow[2] === from.key) {
          to.routeTable[samRowIndex] = row
          return true
        } else {
          // 第三层筛选 | 如果存在且当前行所需距离比原来行所需距离小则直接添加
          if (sameRow[1] > row[1]) {
            to.routeTable[samRowIndex] = row
            return true
          }
        }
      }
      return false
    },
    handleChangeProtocol(value) {
      console.log(value)
      this.init()
    },
    handleChangeRouteStatus(routeKey) {
      // 卸载路由逻辑：
      // 1. 遍历要卸载的路由的邻居路由，将要卸载路由从邻居路由中删除
      this.route[routeKey].status = !this.route[routeKey].status
      if (this.isStart) {
        this.update()
      }
    }
  },
  mounted() {
    this.log.push(`${this.getNow()} 等待 RIP 启动...`)
    let plumbIns = jsPlumb.getInstance()
    plumbIns.ready(function() {
      plumbIns.connect({
        source: "routeA",
        target: "net1",
        connector: "Straight",
        endpoint: "Dot",
        anchor: ["Left", "Right"]
      })
      plumbIns.connect({
        source: "routeA",
        target: "net2",
        connector: "Straight",
        endpoint: "Dot",
        anchor: ["Left", "Right"]
      })
      plumbIns.connect({
        source: "routeA",
        target: "net3",
        connector: "Straight",
        endpoint: "Dot",
        anchor: ["Left", "Right"]
      })
      plumbIns.connect({
        source: "net1",
        target: "routeE",
        endpoint: "Dot",
        connector: "Straight",
        anchor: ["Left", "Right"]
      })
      plumbIns.connect({
        source: "net2",
        target: "routeD",
        endpoint: "Dot",
        connector: "Straight",
        anchor: ["Left", "Right"]
      })
      plumbIns.connect({
        source: "net3",
        target: "routeB",
        endpoint: "Dot",
        connector: "Straight",
        anchor: ["Left", "Right"]
      })
      plumbIns.connect({
        source: "routeB",
        target: "net4",
        connector: "Straight",
        endpoint: "Dot",
        anchor: ["Left", "Right"]
      })
      plumbIns.connect({
        source: "routeE",
        target: "net5",
        endpoint: "Dot",
        connector: "Straight",
        anchor: ["Left", "Right"]
      })
      plumbIns.connect({
        source: "routeD",
        target: "net5",
        endpoint: "Dot",
        connector: "Straight",
        anchor: ["Left", "Right"]
      })
      plumbIns.connect({
        source: "net5",
        target: "routeF",
        endpoint: "Dot",
        anchor: ["TopCenter", "TopCenter"]
      })
      plumbIns.connect({
        source: "net4",
        target: "routeC",
        endpoint: "Dot",
        connector: "Straight",
        anchor: ["Left", "Right"]
      })
      plumbIns.connect({
        source: "routeC",
        target: "net6",
        connector: "Straight",
        endpoint: "Dot",
        anchor: ["Left", "Right"]
      })
      plumbIns.connect({
        source: "net6",
        target: "routeF",
        connector: "Straight",
        endpoint: "Dot",
        anchor: ["Left", "Right"]
      })
    })
  }
}
</script>

<style lang="less">
@import "index.less";
</style>
