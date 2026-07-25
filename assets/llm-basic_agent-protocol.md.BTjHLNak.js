/* empty css                                                                               */import{H as l}from"./chunks/HighLightText.xFkhFkD_.js";import{c as t,o as r,d as p,a as n,e as a,b as e,w as i}from"./chunks/vitepress-theme-teek.BmVBWFw5.js";/* empty css                                                             */const m=JSON.parse('{"title":"MCP 与 A2A：Agent 通信协议深度解析","description":"深度对比MCP与A2A两大Agent协议的设计理念、核心架构与适用场景，涵盖MCP的Client-Server架构与四大原语，以及A2A的Agent Card、Task生命周期与对等通信模型。","frontmatter":{"date":"2026-06-29T10:10:23.000Z","title":"MCP 与 A2A：Agent 通信协议深度解析","tldr":"MCP统一LLM与工具的连接，A2A标准化Agent间协作，两者互补构成Agent生态的协议基础。","description":"深度对比MCP与A2A两大Agent协议的设计理念、核心架构与适用场景，涵盖MCP的Client-Server架构与四大原语，以及A2A的Agent Card、Task生命周期与对等通信模型。","tags":["概念","MCP","A2A","Agent"],"categories":["大模型基础","Agent"],"permalink":"/llm-basic/agent-protocol"},"headers":[],"relativePath":"llm-basic/agent-protocol.md","filePath":"22.大模型基础/06.Agent/02.Agent协议.md"}'),c={name:"llm-basic/agent-protocol.md"},g=Object.assign(c,{setup(b){return(u,s)=>(r(),t("div",null,[s[10]||(s[10]=p('<h1 id="mcp-与-a2a-agent-通信协议深度解析" tabindex="-1">MCP 与 A2A：Agent 通信协议深度解析 <a class="header-anchor" href="#mcp-与-a2a-agent-通信协议深度解析" aria-label="Permalink to “MCP 与 A2A：Agent 通信协议深度解析”">​</a></h1><blockquote><p><strong>摘要</strong>: 系统对比了 Anthropic 的 MCP（Model Context Protocol）与 Google 的 A2A（Agent-to-Agent Protocol）两大 Agent 协议标准。MCP 采用 Client-Server 架构，通过 Resources、Tools、Prompts 和 Sampling 四大原语实现 LLM 与外部工具及数据源的标准化连接，被喻为 &#39;AI 的 USB-C 接口&#39;。A2A 则聚焦于 Agent 之间的任务协作，通过 Agent Card 实现能力发现，以 Task 为基本交互单元支持完整的生命周期管理，被喻为 &#39;Agent 的 HTTP 协议&#39;。两者分工明确：MCP 解决垂直方向的 LLM 到工具连接，A2A 解决水平方向的 Agent 间通信，共同构成 Agent 生态的协议基础设施。</p></blockquote><div class="note custom-block github-alert"><p class="custom-block-title">核心思想</p><p></p><p>Agent 协议是让不同 AI 系统之间&quot;说同一种语言&quot;的标准化接口。没有协议，每个 Agent 和工具都是孤岛；有了协议，就构建了一个互通的 AI 生态系统。</p></div><p>Agent 通常通过<strong>统一的通信协议</strong>、<strong>消息队列</strong>或<strong>共享知识库</strong>进行交互，实现任务委派与协同。常见的通信方式与协议有如下几类：</p><ul><li>标准化通信协议： A2A、MCP</li><li>消息传递与中间件</li><li>协作与交互策略</li></ul><h2 id="_1-mcp-model-context-protocol" tabindex="-1">1. MCP（Model Context Protocol） <a class="header-anchor" href="#_1-mcp-model-context-protocol" aria-label="Permalink to “1. MCP（Model Context Protocol）”">​</a></h2><h3 id="_1-1-背景与愿景" tabindex="-1">1.1 背景与愿景 <a class="header-anchor" href="#_1-1-背景与愿景" aria-label="Permalink to “1.1 背景与愿景”">​</a></h3>',7)),n("p",null,[s[1]||(s[1]=a("2024 年 11 月，Anthropic 发布了 ",-1)),s[2]||(s[2]=n("strong",null,"Model Context Protocol (MCP)",-1)),s[3]||(s[3]=a("，并赋予它一个响亮的比喻：",-1)),s[4]||(s[4]=n("strong",null,'"AI 的 USB-C 接口"',-1)),s[5]||(s[5]=a("，",-1)),e(l,{type:"info"},{default:i(()=>[...s[0]||(s[0]=[a("主要用于 Agent 与外部工具、数据源和上下文建立标准化连接。",-1)])]),_:1})]),s[11]||(s[11]=p(`<p>MCP 解决的问题：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  没有 MCP 的世界：每个 LLM/Agent 都要单独对接每个数据源</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ┌──────┐ ┌──────┐ ┌──────┐</span></span>
<span class="line"><span>  │Claude│ │ Chat │ │开源   │</span></span>
<span class="line"><span>  │      │ │ GPT  │ │模型   │</span></span>
<span class="line"><span>  └──┬───┘ └──┬───┘ └──┬───┘</span></span>
<span class="line"><span>     │        │        │</span></span>
<span class="line"><span>     ├────────┼────────┤  每个模型都写一遍</span></span>
<span class="line"><span>     │        │        │  对接代码 (M×N 的复杂度)</span></span>
<span class="line"><span>     ▼        ▼        ▼</span></span>
<span class="line"><span>  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐</span></span>
<span class="line"><span>  │Google│ │GitHub│ │ Slack│ │ 数据库│</span></span>
<span class="line"><span>  │Drive │ │      │ │      │ │      │</span></span>
<span class="line"><span>  └──────┘ └──────┘ └──────┘ └──────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  有 MCP 的世界：统一接口，即插即用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ┌──────┐ ┌──────┐ ┌──────┐</span></span>
<span class="line"><span>  │Claude│ │ Chat │ │开源  │</span></span>
<span class="line"><span>  │      │ │ GPT  │ │模型  │    ← MCP Hosts (消费者)</span></span>
<span class="line"><span>  └──┬───┘ └──┬───┘ └──┬───┘</span></span>
<span class="line"><span>     │        │        │</span></span>
<span class="line"><span>     └────────┼────────┘</span></span>
<span class="line"><span>              │          一次对接，所有模型通用</span></span>
<span class="line"><span>              ▼</span></span>
<span class="line"><span>      ┌───────────────┐</span></span>
<span class="line"><span>      │   MCP 协议     │          ← 标准接口层</span></span>
<span class="line"><span>      └───────┬───────┘</span></span>
<span class="line"><span>              │</span></span>
<span class="line"><span>     ┌────────┼────────┐</span></span>
<span class="line"><span>     ▼        ▼        ▼</span></span>
<span class="line"><span>  ┌──────┐ ┌──────┐ ┌──────┐</span></span>
<span class="line"><span>  │Google│ │GitHub│ │ Slack│   ← MCP Servers (提供者)</span></span>
<span class="line"><span>  │Drive │ │      │ │      │</span></span>
<span class="line"><span>  └──────┘ └──────┘ └──────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p><strong>类比理解：</strong></p><ul><li>USB-C 出现之前，每个设备都有自己的充电线（Micro USB、Lightning、专用充电器）。USB-C 统一了接口——一根线适配所有设备。</li><li>MCP 同理：<strong>一套协议，让所有 LLM 都能访问所有工具和数据源。</strong></li></ul><h3 id="_1-2-mcp-架构-client-server-transport" tabindex="-1">1.2 MCP 架构：Client / Server / Transport <a class="header-anchor" href="#_1-2-mcp-架构-client-server-transport" aria-label="Permalink to “1.2 MCP 架构：Client / Server / Transport”">​</a></h3><p>MCP 采用经典的 Client-Server 架构：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  ┌──────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>  │                     MCP Host (宿主程序)                    │</span></span>
<span class="line"><span>  │                                                          │</span></span>
<span class="line"><span>  │  ┌──────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>  │  │              MCP Client (客户端)                   │   │</span></span>
<span class="line"><span>  │  │                                                   │   │</span></span>
<span class="line"><span>  │  │  • 管理与 Server 的连接 (1个 Client 可连多个 Server)│   │</span></span>
<span class="line"><span>  │  │  • 协商协议能力和版本                              │   │</span></span>
<span class="line"><span>  │  │  • 将 Server 暴露的功能转换为 LLM 可用的 Tools     │   │</span></span>
<span class="line"><span>  │  │  • 路由 LLM 的 Tool Call 到对应的 Server          │   │</span></span>
<span class="line"><span>  │  └───────────┬──────────────────┬────────────────────┘   │</span></span>
<span class="line"><span>  └──────────────┼──────────────────┼────────────────────────┘</span></span>
<span class="line"><span>                 │                  │</span></span>
<span class="line"><span>        Transport│                  │ Transport</span></span>
<span class="line"><span>        (stdio)  │                  │ (HTTP/SSE)</span></span>
<span class="line"><span>                 ▼                  ▼</span></span>
<span class="line"><span>  ┌─────────────────────┐  ┌─────────────────────┐</span></span>
<span class="line"><span>  │   MCP Server A      │  │   MCP Server B      │</span></span>
<span class="line"><span>  │   (本地文件系统)     │  │   (远程API)          │</span></span>
<span class="line"><span>  │                     │  │                     │</span></span>
<span class="line"><span>  │  Resources:         │  │  Resources:         │</span></span>
<span class="line"><span>  │  • file://docs/     │  │  • postgres://      │</span></span>
<span class="line"><span>  │  • dir://project/   │  │  • github://repo    │</span></span>
<span class="line"><span>  │                     │  │                     │</span></span>
<span class="line"><span>  │  Tools:             │  │  Tools:             │</span></span>
<span class="line"><span>  │  • read_file()      │  │  • search_code()    │</span></span>
<span class="line"><span>  │  • write_file()     │  │  • create_issue()   │</span></span>
<span class="line"><span>  │  • list_dir()       │  │  • get_pr()         │</span></span>
<span class="line"><span>  └─────────────────────┘  └─────────────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p><strong>三个核心角色：</strong></p><table tabindex="0"><thead><tr><th>角色</th><th>说明</th><th>举例</th></tr></thead><tbody><tr><td><strong>MCP Host</strong></td><td>运行 LLM 的应用程序</td><td>Claude Desktop、VS Code、自定义 App</td></tr><tr><td><strong>MCP Client</strong></td><td>Host 中管理 Server 连接的组件</td><td>内嵌在 Host 中的协议客户端</td></tr><tr><td><strong>MCP Server</strong></td><td>提供具体能力的服务端</td><td>文件系统服务、数据库服务、GitHub 服务</td></tr></tbody></table><p><strong>Transport（传输层）的两种模式：</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>stdio 传输 (本地)</span></span>
<span class="line"><span>═══════════════════════════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Host ──&gt; 启动 Server 进程 ──&gt; 通过标准输入/输出通信</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  适用：本地工具（文件系统、命令行、本地数据库）</span></span>
<span class="line"><span>  优点：零网络配置、安全（进程级隔离）</span></span>
<span class="line"><span>  缺点：无法跨机器</span></span>
<span class="line"><span></span></span>
<span class="line"><span>HTTP + SSE 传输 (远程)</span></span>
<span class="line"><span>═══════════════════════════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Host ──&gt; HTTP 请求 ──&gt; 远程 Server</span></span>
<span class="line"><span>                           │</span></span>
<span class="line"><span>                    Server-Sent Events (SSE) 推送 &lt;── 用于实时通知</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  适用：远程服务（GitHub API、企业数据库、第三方工具）</span></span>
<span class="line"><span>  优点：跨网络、可共享</span></span>
<span class="line"><span>  缺点：需要网络安全和认证</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="_1-3-mcp-的核心能力-primitives" tabindex="-1">1.3 MCP 的核心能力（Primitives） <a class="header-anchor" href="#_1-3-mcp-的核心能力-primitives" aria-label="Permalink to “1.3 MCP 的核心能力（Primitives）”">​</a></h3><p>MCP 定义了 Server 可以暴露的四种核心能力：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>MCP 四大能力</span></span>
<span class="line"><span>═══════════════════════════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>  │                                                             │</span></span>
<span class="line"><span>  │  ① Resources (资源)                                         │</span></span>
<span class="line"><span>  │     • 暴露数据给 LLM 阅读                                   │</span></span>
<span class="line"><span>  │     • 类比：文件系统中的&quot;文件&quot;                              │</span></span>
<span class="line"><span>  │     • URI 标识: file:///docs/report.pdf                     │</span></span>
<span class="line"><span>  │     • 支持文本和二进制内容                                   │</span></span>
<span class="line"><span>  │     • 可以有子资源 (Resource Templates)                     │</span></span>
<span class="line"><span>  │                                                             │</span></span>
<span class="line"><span>  │  ② Tools (工具)                                             │</span></span>
<span class="line"><span>  │     • LLM 可以调用的函数（Function Calling）                 │</span></span>
<span class="line"><span>  │     • 类比：API 接口                                        │</span></span>
<span class="line"><span>  │     • 定义：名称、描述、JSON Schema 参数                    │</span></span>
<span class="line"><span>  │     • LLM 决定是否调用、传什么参数                          │</span></span>
<span class="line"><span>  │                                                             │</span></span>
<span class="line"><span>  │  ③ Prompts (提示模板)                                       │</span></span>
<span class="line"><span>  │     • 预定义的 Prompt 模板                                  │</span></span>
<span class="line"><span>  │     • 类比：快捷方式 / 宏                                   │</span></span>
<span class="line"><span>  │     • 可以包含参数，也可引用 Resources                      │</span></span>
<span class="line"><span>  │     • 例如：&quot;code_review&quot; 模板自动引用当前文件              │</span></span>
<span class="line"><span>  │                                                             │</span></span>
<span class="line"><span>  │  ④ Sampling (采样)                                          │</span></span>
<span class="line"><span>  │     • Server 可以请求 Host 进行 LLM 推理                    │</span></span>
<span class="line"><span>  │     • 类比：Server 说&quot;这段文本帮我用 LLM 处理一下&quot;         │</span></span>
<span class="line"><span>  │     • 实现 Agent-to-Agent 的 LLM 能力共享                   │</span></span>
<span class="line"><span>  │     • 注意：Host 可以拒绝（权限控制）                       │</span></span>
<span class="line"><span>  │                                                             │</span></span>
<span class="line"><span>  └─────────────────────────────────────────────────────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p><strong>四种能力的使用场景对比：</strong></p><table tabindex="0"><thead><tr><th>能力</th><th>谁驱动</th><th>典型场景</th><th>类比</th></tr></thead><tbody><tr><td>Resources</td><td>LLM 读取</td><td>&quot;帮我看看这个PDF讲了什么&quot;</td><td>文件</td></tr><tr><td>Tools</td><td>LLM 调用</td><td>&quot;帮我把这段代码提交到GitHub&quot;</td><td>API</td></tr><tr><td>Prompts</td><td>用户/LLM 选择</td><td>&quot;用代码审查模板分析这段代码&quot;</td><td>快捷键</td></tr><tr><td>Sampling</td><td>Server 请求</td><td>Server 内部用 LLM 处理数据</td><td>委托</td></tr></tbody></table><h3 id="_1-4-mcp-的交互流程" tabindex="-1">1.4 MCP 的交互流程 <a class="header-anchor" href="#_1-4-mcp-的交互流程" aria-label="Permalink to “1.4 MCP 的交互流程”">​</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  Host                Client              Server</span></span>
<span class="line"><span>  │                     │                    │</span></span>
<span class="line"><span>  │  1. 启动连接        │                    │</span></span>
<span class="line"><span>  │────────────────────&gt;│                    │</span></span>
<span class="line"><span>  │                     │  2. 初始化握手      │</span></span>
<span class="line"><span>  │                     │───────────────────&gt;│</span></span>
<span class="line"><span>  │                     │  3. 能力协商         │</span></span>
<span class="line"><span>  │                     │&lt;───────────────────│</span></span>
<span class="line"><span>  │                     │  (返回 Resources,   │</span></span>
<span class="line"><span>  │  4. 注册 Tools       │   Tools, Prompts)   │</span></span>
<span class="line"><span>  │&lt;────────────────────│                    │</span></span>
<span class="line"><span>  │                     │                    │</span></span>
<span class="line"><span>  │  5. 用户提问         │                     │</span></span>
<span class="line"><span>  │  &quot;我的项目用了哪些    │                     │</span></span>
<span class="line"><span>  │   开源库？&quot;          │                    │</span></span>
<span class="line"><span>  │                     │                    │</span></span>
<span class="line"><span>  │  6. LLM 分析 → 决定  │                    │</span></span>
<span class="line"><span>  │     读 package.json │                    │</span></span>
<span class="line"><span>  │────────────────────&gt;│                    │</span></span>
<span class="line"><span>  │                     │  7. resources/read │</span></span>
<span class="line"><span>  │                     │───────────────────&gt;│</span></span>
<span class="line"><span>  │                     │  8. 文件内容        │</span></span>
<span class="line"><span>  │                     │&lt;───────────────────│</span></span>
<span class="line"><span>  │  9. LLM 读取结果     │                    │</span></span>
<span class="line"><span>  │&lt;────────────────────│                    │</span></span>
<span class="line"><span>  │                     │                    │</span></span>
<span class="line"><span>  │  10. LLM 分析 →      │                    │</span></span>
<span class="line"><span>  │      需要查每个库     │                    │</span></span>
<span class="line"><span>  │────────────────────&gt;│                    │</span></span>
<span class="line"><span>  │                     │  11. tools/call    │</span></span>
<span class="line"><span>  │                     │  search_web(&quot;react │</span></span>
<span class="line"><span>  │                     │   license&quot;)        │</span></span>
<span class="line"><span>  │                     │───────────────────&gt;│</span></span>
<span class="line"><span>  │                     │  12. 搜索结果       │</span></span>
<span class="line"><span>  │                     │&lt;───────────────────│</span></span>
<span class="line"><span>  │  13. LLM 综合生成    │                    │</span></span>
<span class="line"><span>  │&lt;────────────────────│                    │</span></span>
<span class="line"><span>  │                     │                    │</span></span>
<span class="line"><span>  │  14. 最终回答        │                    │</span></span>
<span class="line"><span>  └─────────────────────┴────────────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><h3 id="_1-5-mcp-生态与现状" tabindex="-1">1.5 MCP 生态与现状 <a class="header-anchor" href="#_1-5-mcp-生态与现状" aria-label="Permalink to “1.5 MCP 生态与现状”">​</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  官方 Server (Anthropic 维护):</span></span>
<span class="line"><span>  ├─ Filesystem: 文件系统操作</span></span>
<span class="line"><span>  ├─ GitHub: GitHub API 集成</span></span>
<span class="line"><span>  ├─ Google Drive: Google 云端硬盘</span></span>
<span class="line"><span>  ├─ PostgreSQL: 数据库查询</span></span>
<span class="line"><span>  ├─ Slack: 团队沟通</span></span>
<span class="line"><span>  ├─ Puppeteer: 浏览器自动化</span></span>
<span class="line"><span>  ├─ Brave Search: 网络搜索</span></span>
<span class="line"><span>  ├─ Memory: 持久化记忆</span></span>
<span class="line"><span>  └─ Git: 版本控制</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  社区 Server (第三方):</span></span>
<span class="line"><span>  ├─ 数百个社区贡献的 Server</span></span>
<span class="line"><span>  ├─ Docker 容器化的 MCP Server</span></span>
<span class="line"><span>  ├─ 云平台集成 (AWS, GCP, Azure)</span></span>
<span class="line"><span>  └─ 企业内部系统 (SAP, Salesforce)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  工具/框架支持:</span></span>
<span class="line"><span>  ├─ Claude Desktop (原生支持)</span></span>
<span class="line"><span>  ├─ Continue (IDE 插件)</span></span>
<span class="line"><span>  ├─ Cursor / Windsurf (AI IDE)</span></span>
<span class="line"><span>  ├─ LangChain / LlamaIndex (通过适配器)</span></span>
<span class="line"><span>  └─ OpenClaw, Hermes (Agent 框架)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  对比关键竞品:</span></span>
<span class="line"><span>  ┌──────────┬──────────┬──────────┬──────────┐</span></span>
<span class="line"><span>  │          │   MCP    │ OpenAI   │ Google   │</span></span>
<span class="line"><span>  │          │(Anthropic│ Function │ A2A      │</span></span>
<span class="line"><span>  │          │  开放)   │ Calling  │          │</span></span>
<span class="line"><span>  ├──────────┼──────────┼──────────┼──────────┤</span></span>
<span class="line"><span>  │ 定位      │ 通用标准 │ 自家API  │ Agent间  │</span></span>
<span class="line"><span>  │ 开放性    │ 完全开放 │ OpenAI专属│ 开放标准 │</span></span>
<span class="line"><span>  │ 模型无关  │ ✅       │ ❌       │ ✅       │</span></span>
<span class="line"><span>  │ 社区驱动  │ ✅       │ ❌       │ ✅       │</span></span>
<span class="line"><span>  └──────────┴──────────┴──────────┴──────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h2 id="_2-a2a-agent-to-agent-protocol" tabindex="-1">2. A2A（Agent-to-Agent Protocol） <a class="header-anchor" href="#_2-a2a-agent-to-agent-protocol" aria-label="Permalink to “2. A2A（Agent-to-Agent Protocol）”">​</a></h2><h3 id="_2-1-背景与定位" tabindex="-1">2.1 背景与定位 <a class="header-anchor" href="#_2-1-背景与定位" aria-label="Permalink to “2.1 背景与定位”">​</a></h3><p>2025 年 4 月，Google 发布了 <strong>Agent-to-Agent Protocol (A2A)</strong>。如果说 MCP 是&quot;AI 的 USB-C&quot;（连接工具与数据），那 A2A 就是&quot;Agent 的 HTTP&quot;——让不同的 Agent 之间互相通信和协作。</p><p>由 Google 等主导的开放标准。它允许不同框架（如 CrewAI、LangGraph）开发的 Agent 进行通信和协作。Agent 会发布自己的“名片”（Agent Card）以供其他 Agent 发现，并通过 HTTP/JSON-RPC 发送任务和流式传输结果。</p><p><strong>MCP vs A2A：分工明确</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  MCP (Model Context Protocol)        A2A (Agent-to-Agent)</span></span>
<span class="line"><span>  ─────────────────────────────        ────────────────────</span></span>
<span class="line"><span>  解决：LLM 如何访问工具和数据          解决：Agent 之间如何协作</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ┌──────────┐                         ┌──────────┐</span></span>
<span class="line"><span>  │   LLM    │                         │ Agent A  │────┐</span></span>
<span class="line"><span>  └─────┬────┘                         │ (搜索)   │    │</span></span>
<span class="line"><span>        │ MCP                          └────┬─────┘    │ A2A</span></span>
<span class="line"><span>        ▼                                  │          │ (对话协议)</span></span>
<span class="line"><span>  ┌──────────────┐                         ▼          │</span></span>
<span class="line"><span>  │  工具/数据源  │                    ┌──────────┐    │</span></span>
<span class="line"><span>  │  (Server)    │                    │ Agent B  │&lt;───┘</span></span>
<span class="line"><span>  └──────────────┘                    │ (分析)   │</span></span>
<span class="line"><span>                                      └──────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  两者不冲突！MCP 让 Agent 有工具可用，</span></span>
<span class="line"><span>  A2A 让 Agent 之间能合作。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><strong>核心区别总结：</strong></p><table tabindex="0"><thead><tr><th>维度</th><th>MCP</th><th>A2A</th></tr></thead><tbody><tr><td><strong>制定者</strong></td><td>Anthropic (2024.11)</td><td>Google (2025.04)</td></tr><tr><td><strong>解决的问题</strong></td><td>模型 ↔ 工具/数据的连接</td><td>Agent ↔ Agent 的协作</td></tr><tr><td><strong>类比</strong></td><td>USB-C（设备接口）</td><td>HTTP（服务间通信）</td></tr><tr><td><strong>参与方</strong></td><td>LLM + 工具</td><td>多个 Agent</td></tr><tr><td><strong>协议内容</strong></td><td>Resources, Tools, Prompts, Sampling</td><td>Agent Card, Task, Message, Artifact</td></tr><tr><td><strong>核心操作</strong></td><td>读取资源、调用工具</td><td>任务委托、状态查询、结果交换</td></tr><tr><td><strong>传输</strong></td><td>stdio / HTTP+SSE</td><td>HTTP + JSON-RPC</td></tr></tbody></table><h3 id="_2-2-a2a-核心概念" tabindex="-1">2.2 A2A 核心概念 <a class="header-anchor" href="#_2-2-a2a-核心概念" aria-label="Permalink to “2.2 A2A 核心概念”">​</a></h3><h4 id="_2-2-1-agent-card-agent-名片" tabindex="-1">2.2.1 Agent Card（Agent 名片） <a class="header-anchor" href="#_2-2-1-agent-card-agent-名片" aria-label="Permalink to “2.2.1 Agent Card（Agent 名片）”">​</a></h4><p>每个 A2A Agent 都有一个公开的&quot;名片&quot;，描述自己能做什么：</p><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Agent Card 示例</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Research Agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;进行深度网络搜索和学术文献检索的Agent&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;url&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://agents.company.com/research&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;version&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1.0.0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;capabilities&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;streaming&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,       </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 支持流式返回</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;pushNotifications&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 支持主动推送通知</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;stateTransitionHistory&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 保留任务状态历史</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;skills&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;web_search&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;网络搜索&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;搜索互联网上的公开信息，支持中英文&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;examples&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;搜索2025年AI趋势&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;查找最新的量子计算论文&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;inputModes&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;outputModes&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;json&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;academic_search&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;学术搜索&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;搜索学术数据库（arXiv, PubMed, IEEE等）&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;examples&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;找关于Transformer架构的论文&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;inputModes&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;outputModes&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;json&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;defaultInputModes&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;defaultOutputModes&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;text&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;authentication&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;schemes&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;bearer_token&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p><strong>Agent Card 的作用：</strong></p><ul><li>让其他 Agent 发现和了解这个 Agent 的能力</li><li>自动生成工具描述（将 Card 信息转化为 Function Calling 的 tool definition）</li><li>服务发现：构建 Agent 目录/市场的基础</li></ul><h4 id="_2-2-2-task-任务-——-a2a-的核心交互单元" tabindex="-1">2.2.2 Task（任务）—— A2A 的核心交互单元 <a class="header-anchor" href="#_2-2-2-task-任务-——-a2a-的核心交互单元" aria-label="Permalink to “2.2.2 Task（任务）—— A2A 的核心交互单元”">​</a></h4><p>A2A 中，Agent 之间的交互以&quot;任务（Task）&quot;为单位，Task 的生命周期如下：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  状态转换图:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       ┌─────────┐</span></span>
<span class="line"><span>       │ pending │  ← 任务已创建，等待处理</span></span>
<span class="line"><span>       └────┬────┘</span></span>
<span class="line"><span>            │</span></span>
<span class="line"><span>            ▼</span></span>
<span class="line"><span>       ┌──────────┐</span></span>
<span class="line"><span>       │  working  │  ← Agent 正在处理任务</span></span>
<span class="line"><span>       └────┬─────┘</span></span>
<span class="line"><span>            │</span></span>
<span class="line"><span>       ┌────┴────┐</span></span>
<span class="line"><span>       ▼         ▼</span></span>
<span class="line"><span>  ┌─────────┐ ┌──────────┐</span></span>
<span class="line"><span>  │completed│ │  failed  │  ← 最终状态</span></span>
<span class="line"><span>  └─────────┘ └──────────┘</span></span>
<span class="line"><span>       │         │</span></span>
<span class="line"><span>       └────┬────┘</span></span>
<span class="line"><span>            ▼</span></span>
<span class="line"><span>       ┌──────────┐</span></span>
<span class="line"><span>       │ cancelled│  ← 用户或发起 Agent 取消</span></span>
<span class="line"><span>       └──────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p><strong>一个完整的 Task 委托流程：</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Agent A (编排者) 向 Agent B (研究员) 委托任务</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 1 — 创建任务 (POST /tasks)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Request:</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    &quot;id&quot;: &quot;task-001&quot;,</span></span>
<span class="line"><span>    &quot;sessionId&quot;: &quot;session-abc&quot;,</span></span>
<span class="line"><span>    &quot;message&quot;: {</span></span>
<span class="line"><span>      &quot;role&quot;: &quot;user&quot;,</span></span>
<span class="line"><span>      &quot;parts&quot;: [{</span></span>
<span class="line"><span>        &quot;type&quot;: &quot;text&quot;,</span></span>
<span class="line"><span>        &quot;text&quot;: &quot;请调研2025年AI Agent领域最重要的3个技术突破&quot;</span></span>
<span class="line"><span>      }]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Response:</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    &quot;id&quot;: &quot;task-001&quot;,</span></span>
<span class="line"><span>    &quot;status&quot;: &quot;working&quot;,</span></span>
<span class="line"><span>    &quot;sessionId&quot;: &quot;session-abc&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 2 — Agent A 轮询状态 (GET /tasks/task-001)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    &quot;id&quot;: &quot;task-001&quot;,</span></span>
<span class="line"><span>    &quot;status&quot;: &quot;working&quot;,</span></span>
<span class="line"><span>    &quot;sessionId&quot;: &quot;session-abc&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Step 3 — 任务完成，Agent B 推送结果 (如果支持 pushNotifications)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    &quot;id&quot;: &quot;task-001&quot;,</span></span>
<span class="line"><span>    &quot;status&quot;: &quot;completed&quot;,</span></span>
<span class="line"><span>    &quot;artifacts&quot;: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        &quot;name&quot;: &quot;research_summary&quot;,</span></span>
<span class="line"><span>        &quot;parts&quot;: [{</span></span>
<span class="line"><span>          &quot;type&quot;: &quot;text&quot;,</span></span>
<span class="line"><span>          &quot;text&quot;: &quot;2025年AI Agent三大突破：\\n1. ...&quot;</span></span>
<span class="line"><span>        }]</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    &quot;history&quot;: [</span></span>
<span class="line"><span>      // 任务执行的历史记录（类似 ReAct trace）</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><h3 id="_2-3-a2a-与-mcp-的分工协作" tabindex="-1">2.3 A2A 与 MCP 的分工协作 <a class="header-anchor" href="#_2-3-a2a-与-mcp-的分工协作" aria-label="Permalink to “2.3 A2A 与 MCP 的分工协作”">​</a></h3><p><strong>MCP + A2A 协同工作全景</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>                     ┌──────────────────────┐</span></span>
<span class="line"><span>                     │    用户 / Host        │</span></span>
<span class="line"><span>                     └──────────┬───────────┘</span></span>
<span class="line"><span>                                │</span></span>
<span class="line"><span>                                ▼</span></span>
<span class="line"><span>                     ┌──────────────────────┐</span></span>
<span class="line"><span>                     │   编排 Agent          │</span></span>
<span class="line"><span>                     │   (Orchestrator)      │</span></span>
<span class="line"><span>                     │                      │</span></span>
<span class="line"><span>                     │  通过 MCP 访问:       │</span></span>
<span class="line"><span>                     │  • 知识库 (Resources) │</span></span>
<span class="line"><span>                     │  • 搜索工具 (Tools)   │</span></span>
<span class="line"><span>                     │  • 通知模板 (Prompts) │</span></span>
<span class="line"><span>                     └──┬───────┬───────┬───┘</span></span>
<span class="line"><span>                        │       │       │</span></span>
<span class="line"><span>                   A2A  │  A2A  │  A2A  │</span></span>
<span class="line"><span>                        ▼       ▼       ▼</span></span>
<span class="line"><span>              ┌──────────┐ ┌──────────┐ ┌──────────┐</span></span>
<span class="line"><span>              │ 搜索Agent │ │ 分析Agent │ │ 写作Agent │</span></span>
<span class="line"><span>              └─────┬─────┘ └─────┬─────┘ └─────┬─────┘</span></span>
<span class="line"><span>                    │             │             │</span></span>
<span class="line"><span>               MCP  │        MCP  │        MCP  │</span></span>
<span class="line"><span>                    ▼             ▼             ▼</span></span>
<span class="line"><span>              ┌──────────┐ ┌──────────┐ ┌──────────┐</span></span>
<span class="line"><span>              │ Web搜索   │ │ 数据库    │ │ 文件系统  │</span></span>
<span class="line"><span>              │ 学术搜索  │ │ 计算工具  │ │ 导出工具  │</span></span>
<span class="line"><span>              └──────────┘ └──────────┘ └──────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  总结：</span></span>
<span class="line"><span>  • MCP：垂直连接 — Agent 与其直接依赖的工具/数据之间</span></span>
<span class="line"><span>  • A2A：水平连接 — Agent 与 Agent 之间的任务协作</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h3 id="_2-4-a2a-的设计特点与现状" tabindex="-1">2.4 A2A 的设计特点与现状 <a class="header-anchor" href="#_2-4-a2a-的设计特点与现状" aria-label="Permalink to “2.4 A2A 的设计特点与现状”">​</a></h3><p>核心设计理念是<strong>实现智能体之间的点对点通信</strong>。 A2A 关注的是智能体之间如何相互协作。这种设计让智能体能够像人类团队一样进行对话、协商和协作。</p><p>A2A 的设计哲学是&quot;对等通信&quot;，在 A2A 网络中，每个智能体既是服务提供者，也是服务消费者。智能体可以主动发起请求，也可以响应其他智能体的请求。这种对等的设计避免了中心化协调器的瓶颈，让智能体网络更加灵活和可扩展。</p><p><strong>设计哲学：</strong></p>`,46)),n("ul",null,[s[7]||(s[7]=n("li",null,"Agent 即服务：每个 Agent 像微服务一样对待",-1)),n("li",null,[e(l,{type:"info"},{default:i(()=>[...s[6]||(s[6]=[a("异步优先：任务可能耗时，支持长轮询和推送通知",-1)])]),_:1})]),s[8]||(s[8]=n("li",null,"多模态：输入和输出都支持 text、image、audio 等多种模态",-1)),s[9]||(s[9]=n("li",null,"安全：认证、授权、速率限制内置",-1))]),s[12]||(s[12]=p('<p><strong>与 MCP 的互补关系：</strong></p><table tabindex="0"><thead><tr><th>场景</th><th>用什么协议</th></tr></thead><tbody><tr><td>Agent 需要读取本地文件</td><td>MCP (Resources)</td></tr><tr><td>Agent 需要调用外部 API</td><td>MCP (Tools)</td></tr><tr><td>Agent A 把任务派给 Agent B</td><td>A2A (Task)</td></tr><tr><td>Agent A 查询 Agent B 的任务进度</td><td>A2A (Task Status)</td></tr><tr><td>Agent 需要 LLM 推理能力</td><td>MCP (Sampling)</td></tr><tr><td>Agent 之间交换分析结果</td><td>A2A (Artifacts)</td></tr></tbody></table><h2 id="_3-总结" tabindex="-1">3. 总结 <a class="header-anchor" href="#_3-总结" aria-label="Permalink to “3. 总结”">​</a></h2><table tabindex="0"><thead><tr><th>特性</th><th>MCP</th><th>A2A</th></tr></thead><tbody><tr><td>制定方</td><td>Anthropic (2024.11)</td><td>Google (2025.04)</td></tr><tr><td>核心比喻</td><td>AI 的 USB-C</td><td>Agent 的 HTTP</td></tr><tr><td>解决的问题</td><td>LLM ↔ 工具/数据</td><td>Agent ↔ Agent</td></tr><tr><td>层级</td><td>工具调用层</td><td>服务协作层</td></tr><tr><td>核心概念</td><td>Resources, Tools, Prompts, Sampling</td><td>Agent Card, Task, Artifact</td></tr><tr><td>传输协议</td><td>stdio / HTTP+SSE</td><td>HTTP + JSON-RPC</td></tr><tr><td>开放性</td><td>完全开放</td><td>开放标准</td></tr></tbody></table><p><strong>关键要点：</strong></p><ol><li>MCP 解决的是&quot;让 LLM 连接万物&quot;——统一工具和数据访问的接口标准。</li><li>A2A 解决的是&quot;让 Agent 互相协作&quot;——Agent 之间任务委托和状态追踪的标准。</li><li>两者不是竞争关系，而是互补关系——就像 USB-C（连设备）和 HTTP（服务间通信）。</li><li>MCP 的四大原语（Resources/Tools/Prompts/Sampling）覆盖了从读取到执行的全场景。</li><li>A2A 的 Agent Card 让 Agent 能力可发现，Task 让协作可追踪。</li></ol>',6))]))}});export{m as __pageData,g as default};
