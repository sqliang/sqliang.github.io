import{F as p}from"./chunks/FigureContainer.4qxozqQY.js";import{H as i}from"./chunks/HighLightText.DA6OcS8b.js";import{c as t,o as r,d as n,b as a,a as e,e as l,w as c}from"./chunks/vitepress-theme-teek.CQIWG8wh.js";/* empty css                                                                               *//* empty css                                                             */const q=JSON.parse('{"title":"AI Agent 技术全景：从基础原理到多智能体协作","description":"全面解析AI Agent的核心架构与运作原理，涵盖ReAct与Plan-and-Execute推理模式、三级记忆体系、Multi-Agent协作模式及Agent间通信方式，构建对Agent技术的系统认知。","frontmatter":{"date":"2026-06-29T10:10:00.000Z","title":"AI Agent 技术全景：从基础原理到多智能体协作","tldr":"Agent赋予LLM自主感知、推理与行动能力，是AI从对话工具向数字员工跃迁的关键。","description":"全面解析AI Agent的核心架构与运作原理，涵盖ReAct与Plan-and-Execute推理模式、三级记忆体系、Multi-Agent协作模式及Agent间通信方式，构建对Agent技术的系统认知。","tags":["概念","Agent","LLM","Multi-Agent","ReAct"],"categories":["大模型基础","Agent"],"permalink":"/llm-basic/agent-introduction"},"headers":[],"relativePath":"llm-basic/agent-introduction.md","filePath":"22.大模型基础/06.Agent/01.Agent简介.md"}'),b={name:"llm-basic/agent-introduction.md"},A=Object.assign(b,{setup(u){return(o,s)=>(r(),t("div",null,[s[3]||(s[3]=n('<h1 id="ai-agent-技术全景-从基础原理到多智能体协作" tabindex="-1">AI Agent 技术全景：从基础原理到多智能体协作 <a class="header-anchor" href="#ai-agent-技术全景-从基础原理到多智能体协作" aria-label="Permalink to “AI Agent 技术全景：从基础原理到多智能体协作”">​</a></h1><blockquote><p><strong>摘要</strong>: 从Agent的定义与核心公式（LLM + 工具 + 记忆 + 规划能力）出发，系统阐述了Agent与传统Chatbot在交互模式、行动能力、任务复杂度等维度的本质差异，并划分了从工具增强型到完全自主的五个自主性层级。随后深入拆解了ReAct（推理与行动交替）、Plan-and-Execute（先规划后执行）和Reflection（反思与自我纠正）三种核心推理模式。在此基础上，详细分析了Agent的三级记忆体系（工作记忆、短期记忆、长期记忆）及其技术实现，并系统梳理了Multi-Agent协作的四种模式（顺序、并行、辩论、层级）与四种通信方式（消息传递、共享黑板、函数调用、事件总线）的适用边界与工程挑战。</p></blockquote><div class="note custom-block github-alert"><p class="custom-block-title">核心思想</p><p></p><p>Agent 是一个能自主感知环境、做出决策、执行行动的 AI 系统。它不再是&quot;一问一答&quot;的聊天机器人，而是能主动完成任务的&quot;数字员工&quot;。</p></div><h2 id="_1-agent-基础概念" tabindex="-1">1. Agent 基础概念 <a class="header-anchor" href="#_1-agent-基础概念" aria-label="Permalink to “1. Agent 基础概念”">​</a></h2><h3 id="_1-1-什么是-ai-agent" tabindex="-1">1.1 什么是 AI Agent？ <a class="header-anchor" href="#_1-1-什么是-ai-agent" aria-label="Permalink to “1.1 什么是 AI Agent？”">​</a></h3><p>如果用一句话定义：<strong>AI Agent = LLM + 工具 + 记忆 + 规划能力</strong>，它把 LLM 的智能从&quot;被动回答&quot;升级为&quot;主动完成复杂任务&quot;。</p>',6)),a(p,{type:"image",content:"https://insight-stack-1252300811.cos.ap-shanghai.myqcloud.com/img/ai-practice/agent_architecture.png",caption:""}),s[4]||(s[4]=n(`<p>具备以下四大核心特质：</p><table tabindex="0"><thead><tr><th>特质</th><th>说明</th></tr></thead><tbody><tr><td><strong>自主性 (Autonomy)</strong></td><td>无须时刻盯着，设定目标后它能自己想办法完成。</td></tr><tr><td><strong>适应性 (Adaptability)</strong></td><td>环境变了（比如网页改版或 API 报错），它能实时调整策略。</td></tr><tr><td><strong>主动性 (Proactivity)</strong></td><td>不只是被动响应指令，它会主动拆解目标并寻找路径。</td></tr><tr><td><strong>社会性 (Sociality)</strong></td><td>它能像人一样，与其他 Agent 或人类进行协作。</td></tr></tbody></table><p><strong>Agent 的核心循环</strong>：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span></span></span>
<span class="line"><span>                    ┌──────────────────────────┐</span></span>
<span class="line"><span>                    │                          │</span></span>
<span class="line"><span>                    ▼                          │</span></span>
<span class="line"><span>          ┌───────────────┐                   │</span></span>
<span class="line"><span>          │  ① 感知       │                   │</span></span>
<span class="line"><span>          │ (Perception)  │                   │</span></span>
<span class="line"><span>          │               │                   │</span></span>
<span class="line"><span>          │ 接收用户输入   │                   │</span></span>
<span class="line"><span>          │ 获取环境信息   │                   │</span></span>
<span class="line"><span>          │ 读取工具结果   │                   │</span></span>
<span class="line"><span>          └───────┬───────┘                   │</span></span>
<span class="line"><span>                  │                           │</span></span>
<span class="line"><span>                  ▼                           │</span></span>
<span class="line"><span>          ┌───────────────┐                   │</span></span>
<span class="line"><span>          │  ② 推理       │                   │</span></span>
<span class="line"><span>          │ (Reasoning)   │                   │</span></span>
<span class="line"><span>          │               │                   │</span></span>
<span class="line"><span>          │ 分析当前状况   │                   │</span></span>
<span class="line"><span>          │ 制定行动计划   │                   │</span></span>
<span class="line"><span>          │ 决定下一步动作 │                   │</span></span>
<span class="line"><span>          └───────┬───────┘                   │</span></span>
<span class="line"><span>                  │                           │</span></span>
<span class="line"><span>                  ▼                           │</span></span>
<span class="line"><span>          ┌───────────────┐                   │</span></span>
<span class="line"><span>          │  ③ 行动       │                   │</span></span>
<span class="line"><span>          │ (Action)      │                   │</span></span>
<span class="line"><span>          │               │                   │</span></span>
<span class="line"><span>          │ 调用工具/函数  │                   │</span></span>
<span class="line"><span>          │ 生成回答       │                   │</span></span>
<span class="line"><span>          │ 更新内部状态   │                   │</span></span>
<span class="line"><span>          └───────┬───────┘                   │</span></span>
<span class="line"><span>                  │                           │</span></span>
<span class="line"><span>                  ▼                           │</span></span>
<span class="line"><span>          ┌───────────────┐                   │</span></span>
<span class="line"><span>          │  ④ 反馈       │                   │</span></span>
<span class="line"><span>          │ (Feedback)    │                   │</span></span>
<span class="line"><span>          │               │                   │</span></span>
<span class="line"><span>          │ 评估行动结果   │                   │</span></span>
<span class="line"><span>          │ 判断任务是否   │────── 未完成 ──────┘</span></span>
<span class="line"><span>          │ 完成？         │</span></span>
<span class="line"><span>          └───────┬───────┘</span></span>
<span class="line"><span>                  │ 完成</span></span>
<span class="line"><span>                  ▼</span></span>
<span class="line"><span>            返回最终结果</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><h3 id="_1-2-与-chatbot-的本质区别" tabindex="-1">1.2 与 Chatbot 的本质区别 <a class="header-anchor" href="#_1-2-与-chatbot-的本质区别" aria-label="Permalink to “1.2 与 Chatbot 的本质区别”">​</a></h3><p>很多人混淆了&quot;好的 Chatbot&quot;和&quot;Agent&quot;。它们的区别是根本性的：</p><ul><li><strong>Chatbot</strong>：一问一答，用户推动对话，每步都需要用户指令。</li><li><strong>Agent</strong>：目标驱动，自主执行任务，无需用户持续参与。</li></ul><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Chatbot 模式（被动）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  User: &quot;今天天气怎么样？&quot;</span></span>
<span class="line"><span>  Bot:  &quot;北京今天晴，25°C&quot;</span></span>
<span class="line"><span>  User: &quot;那适合户外运动吗？&quot;</span></span>
<span class="line"><span>  Bot:  &quot;适合。&quot;</span></span>
<span class="line"><span>  User: &quot;能帮我推荐一个地方吗？&quot;</span></span>
<span class="line"><span>  Bot:  &quot;朝阳公园不错。&quot;</span></span>
<span class="line"><span>  User: &quot;帮我查一下朝阳公园怎么去&quot;</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>Agent 模式（自主）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  User: &quot;帮我安排一个适合户外运动的周末活动&quot;</span></span>
<span class="line"><span>  Agent:</span></span>
<span class="line"><span>    Step 1: 查天气 → 这周末两天都是晴天，25°C ✓</span></span>
<span class="line"><span>    Step 2: 搜户外运动场所 → 朝阳公园、奥体中心、香山</span></span>
<span class="line"><span>    Step 3: 查交通 → 朝阳公园地铁直达，最方便</span></span>
<span class="line"><span>    Step 4: 查是否需要预约 → 不需要预约，免费开放</span></span>
<span class="line"><span>    Step 5: 生成总结 → &quot;推荐周六去朝阳公园，地铁14号线直达，</span></span>
<span class="line"><span>                        不需要预约，天气晴朗，建议上午9点出发...&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p><strong>核心差异对比表：</strong></p><table tabindex="0"><thead><tr><th>维度</th><th>Chatbot</th><th>Agent</th></tr></thead><tbody><tr><td><strong>交互模式</strong></td><td>一问一答</td><td><strong>目标驱动，自主执行</strong></td></tr><tr><td><strong>行动能力</strong></td><td>只能输出文字</td><td><strong>可调用工具、操作外部系统</strong></td></tr><tr><td><strong>任务复杂度</strong></td><td><strong>单轮简单任务</strong><br><br><strong>需要特别关注上下文管理，信息与向量库检索的RAG<br>，以及工具调用等</strong></td><td><strong>多步骤复杂任务</strong></td></tr><tr><td><strong>自主性</strong></td><td>无，完全依赖用户推动</td><td><strong>高，自主规划与执行</strong></td></tr><tr><td><strong>记忆</strong></td><td>通常无，最多上下文窗口<br><br>上下文窗口、个性化特征、webSearch、信息与向量检索<br>均可用来辅助，如 AI 搜索相关业务</td><td><strong>短期+长期+工作记忆</strong></td></tr><tr><td><strong>错误处理</strong></td><td>无法自我纠正</td><td><strong>可反思、重试、调整策略</strong></td></tr><tr><td><strong>类比</strong></td><td>知识丰富的图书管理员</td><td><strong>能独立完成项目的实习生</strong></td></tr></tbody></table><h3 id="_1-3-agent-自主性层级-autonomy-levels" tabindex="-1">1.3 Agent 自主性层级（Autonomy Levels） <a class="header-anchor" href="#_1-3-agent-自主性层级-autonomy-levels" aria-label="Permalink to “1.3 Agent 自主性层级（Autonomy Levels）”">​</a></h3><p>并非所有 Agent 都有同等的自主性。我们可以划分一个层级：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  Level 0: 无自主性（基础 Chatbot）</span></span>
<span class="line"><span>  ├─ 只能按模板回复</span></span>
<span class="line"><span>  └─ 举例：传统客服机器人（如果...那么...）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Level 1: 工具增强型（Tool-Augmented LLM）</span></span>
<span class="line"><span>  ├─ 能按需调用工具，但不规划多步骤</span></span>
<span class="line"><span>  └─ 举例：&quot;查一下北京天气&quot; → 调用 get_weather → 回答</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Level 2: 基础 Agent（单任务自主）</span></span>
<span class="line"><span>  ├─ 能自主规划并执行多步骤任务</span></span>
<span class="line"><span>  ├─ 有基本错误处理</span></span>
<span class="line"><span>  └─ 举例：自动安排周末活动</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Level 3: 高级 Agent（复杂任务自主）</span></span>
<span class="line"><span>  ├─ 能处理模糊目标和不确定环境</span></span>
<span class="line"><span>  ├─ 动态调整计划、深度学习</span></span>
<span class="line"><span>  └─ 举例：DevIn（编程Agent）、客服Agent</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Level 4: 完全自主 Agent</span></span>
<span class="line"><span>  ├─ 长期目标驱动，能跨会话持续工作</span></span>
<span class="line"><span>  ├─ 自主管理资源和优先级</span></span>
<span class="line"><span>  └─ 举例：目前还不存在（2026年仍是研究目标）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="_2-1-react-reasoning-acting" tabindex="-1">2.1 ReAct（Reasoning + Acting） <a class="header-anchor" href="#_2-1-react-reasoning-acting" aria-label="Permalink to “2.1 ReAct（Reasoning + Acting）”">​</a></h3><p>ReAct 是 2022 年提出的经典 Agent 模式，也是大多数现代 Agent 框架的基础。核心思想：<strong>推理和行动交替进行。</strong></p><p><strong>ReAct 模式的工作循环</strong>：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  每次循环包含三步：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ┌──────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>  │ Thought (思考): &quot;我现在知道了什么？还需要知道什么？&quot;          │</span></span>
<span class="line"><span>  │    ↓                                                         │</span></span>
<span class="line"><span>  │ Action (行动): &quot;我需要调用 {工具名}，参数是 {参数}&quot;           │</span></span>
<span class="line"><span>  │    ↓                                                         │</span></span>
<span class="line"><span>  │ Observation (观察): &quot;工具返回了 {结果}，这对我的任务意味着什么？│</span></span>
<span class="line"><span>  │    ↓                                                         │</span></span>
<span class="line"><span>  │ (回到 Thought，直到任务完成)                                  │</span></span>
<span class="line"><span>  └──────────────────────────────────────────────────────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>一个完整的 ReAct 示例：</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务：找出 2024 年诺贝尔物理学奖得主，并介绍其最重要的贡献。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>=== ReAct 循环 ===</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Round 1:</span></span>
<span class="line"><span>  Thought: 我需要知道2024年诺贝尔物理学奖得主是谁。</span></span>
<span class="line"><span>           我的知识截止于训练日期，2024年的信息需要外部检索。</span></span>
<span class="line"><span>  Action: search(&quot;2024年诺贝尔物理学奖得主&quot;)</span></span>
<span class="line"><span>  Observation: 2024年诺贝尔物理学奖授予了John J. Hopfield</span></span>
<span class="line"><span>               和Geoffrey E. Hinton...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Round 2:</span></span>
<span class="line"><span>  Thought: 我知道了得主是Hopfield和Hinton。现在需要</span></span>
<span class="line"><span>           了解他们最重要的贡献。</span></span>
<span class="line"><span>  Action: search(&quot;John Hopfield 最重要贡献 物理学&quot;)</span></span>
<span class="line"><span>  Observation: John Hopfield发明了Hopfield网络，一种</span></span>
<span class="line"><span>               联想记忆的神经网络模型...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Round 3:</span></span>
<span class="line"><span>  Thought: 还需要查Hinton的贡献。</span></span>
<span class="line"><span>  Action: search(&quot;Geoffrey Hinton 最重要贡献 深度学习&quot;)</span></span>
<span class="line"><span>  Observation: Geoffrey Hinton被誉为&quot;深度学习之父&quot;，</span></span>
<span class="line"><span>               主要贡献包括反向传播算法、玻尔兹曼机...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Round 4:</span></span>
<span class="line"><span>  Thought: 信息已经足够。我可以整合回答。</span></span>
<span class="line"><span>  Final Answer: 2024年诺贝尔物理学奖授予了约翰·霍普菲尔德</span></span>
<span class="line"><span>  和杰弗里·辛顿，以表彰他们在人工神经网络方面的基础性发现和发明...</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p><strong>ReAct 的 Prompt 结构（简化版）：</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>你是一个能使用工具的智能助手。按以下格式思考和行动：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Thought: 你对当前状况的分析</span></span>
<span class="line"><span>Action: 工具名称</span></span>
<span class="line"><span>Action Input: 工具的输入参数（JSON格式）</span></span>
<span class="line"><span>Observation: [工具执行后，结果会在这里显示]</span></span>
<span class="line"><span>...（重复 Thought/Action/Observation 直到完成）</span></span>
<span class="line"><span>Thought: 我已经有足够的信息来回答问题</span></span>
<span class="line"><span>Final Answer: 给用户的最终答案</span></span>
<span class="line"><span></span></span>
<span class="line"><span>可用工具：</span></span>
<span class="line"><span>- search(query: str): 网络搜索</span></span>
<span class="line"><span>- calculator(expr: str): 数学计算</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="_2-2-plan-and-execute-先规划-再执行" tabindex="-1">2.2 Plan-and-Execute（先规划，再执行） <a class="header-anchor" href="#_2-2-plan-and-execute-先规划-再执行" aria-label="Permalink to “2.2 Plan-and-Execute（先规划，再执行）”">​</a></h3>`,22)),e("p",null,[s[1]||(s[1]=e("strong",null,'ReAct 是"走一步看一步"，Plan-and-Execute 是"先画地图再出发"',-1)),s[2]||(s[2]=l("。",-1)),a(i,{type:"note"},{default:c(()=>[...s[0]||(s[0]=[l("对于复杂的、步骤明确的任务，Plan-and-Execute 更高效。",-1)])]),_:1})]),s[5]||(s[5]=n(`<ul><li>ReAct 适合不确定性高的任务，比如在陌生的城市“边走边问”。</li><li>Plan-and-Execute 适合复杂、步骤可预期的任务。</li></ul><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Plan-and-Execute 对比 ReAct</span></span>
<span class="line"><span>═══════════════════════════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ReAct（边想边做）:                   Plan-and-Execute（先规划后执行）:</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  Step 1: 想 → 做                     Phase 1: 制定计划</span></span>
<span class="line"><span>  Step 2: 根据结果想 → 做              ├─ 分析任务</span></span>
<span class="line"><span>  Step 3: 再想 → 做                   ├─ 分解为子任务</span></span>
<span class="line"><span>  Step 4: ...直到完成                  └─ 输出执行计划</span></span>
<span class="line"><span>                                         │</span></span>
<span class="line"><span>  适合：不确定性高的任务                 ▼</span></span>
<span class="line"><span>  类比：在陌生的城市&quot;边走边问&quot;          Phase 2: 执行计划</span></span>
<span class="line"><span>                                        ├─ 子任务1 → 工具调用</span></span>
<span class="line"><span>                                        ├─ 子任务2 → 工具调用</span></span>
<span class="line"><span>                                        └─ 子任务3 → 工具调用</span></span>
<span class="line"><span>                                           │</span></span>
<span class="line"><span>                                           ▼</span></span>
<span class="line"><span>                                        Phase 3: 汇总结果</span></span>
<span class="line"><span>                                        </span></span>
<span class="line"><span>									  适合：步骤可预期的任务</span></span>
<span class="line"><span>									  类比：在熟悉的城市&quot;先看地图再出发&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p><strong>Plan-and-Execute 完整示例：</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务：写一份关于公司Q3业绩的分析报告</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Phase 1 — Planning（LLM 制定计划）：</span></span>
<span class="line"><span>  Plan:</span></span>
<span class="line"><span>  1. 获取Q3财务数据（收入、利润、成本）</span></span>
<span class="line"><span>  2. 获取Q2财务数据（用于环比分析）</span></span>
<span class="line"><span>  3. 获取行业Q3平均水平（用于对比）</span></span>
<span class="line"><span>  4. 计算同比增长率</span></span>
<span class="line"><span>  5. 分析主要增长驱动因素</span></span>
<span class="line"><span>  6. 撰写报告（执行摘要 + 详细分析 + 展望）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Phase 2 — Execution（依次执行）：</span></span>
<span class="line"><span>  Step 1: get_financial_data(quarter=&quot;2024-Q3&quot;) → {...}</span></span>
<span class="line"><span>  Step 2: get_financial_data(quarter=&quot;2024-Q2&quot;) → {...}</span></span>
<span class="line"><span>  Step 3: get_industry_avg(quarter=&quot;2024-Q3&quot;) → {...}</span></span>
<span class="line"><span>  Step 4: calculate(yoy_growth) → 15.3%</span></span>
<span class="line"><span>  Step 5: analyze_growth_drivers(data) → &quot;AI产品线增长显著...&quot;</span></span>
<span class="line"><span>  Step 6: 综合以上信息，生成报告</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Phase 3 — Aggregation（汇总输出）：</span></span>
<span class="line"><span>  &quot;执行摘要：Q3收入同比增长15.3%，主要得益于AI产品线</span></span>
<span class="line"><span>   的快速增长。利润率提升2个百分点...&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>为避免 Plan-and-Execute 执行后偏离任务目标，需要添加一个 Replan 模块：</p>`,5)),a(p,{type:"image",content:"https://insight-stack-1252300811.cos.ap-shanghai.myqcloud.com/img/ai-practice/plan_and_execute.png",caption:"Plan-and-Execute 模式"}),s[6]||(s[6]=n(`<h3 id="_2-3-reflection-self-correction-反思与自我纠正" tabindex="-1">2.3 Reflection / Self-Correction（反思与自我纠正） <a class="header-anchor" href="#_2-3-reflection-self-correction-反思与自我纠正" aria-label="Permalink to “2.3 Reflection / Self-Correction（反思与自我纠正）”">​</a></h3><p>好的 Agent 不是一次就做对的，<strong>它会检查自己的工作并修正错误</strong>。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Reflection 模式</span></span>
<span class="line"><span>═══════════════════════════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ┌────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>  │                    主循环                                  │</span></span>
<span class="line"><span>  │                                                           │</span></span>
<span class="line"><span>  │  Generate (生成) ──&gt; Reflect (反思) ──&gt; 够好了吗？         │</span></span>
<span class="line"><span>  │       ▲                                    │              │</span></span>
<span class="line"><span>  │       │                               ┌────┴────┐        │</span></span>
<span class="line"><span>  │       │                              是         否        │</span></span>
<span class="line"><span>  │       │                               │          │         │</span></span>
<span class="line"><span>  │       │                               ▼          ▼         │</span></span>
<span class="line"><span>  │       │                            输出     Revise (修改)  │</span></span>
<span class="line"><span>  │       │                                        │           │</span></span>
<span class="line"><span>  │       └────────────────────────────────────────┘           │</span></span>
<span class="line"><span>  └────────────────────────────────────────────────────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><strong>Reflection 的两种实现方式：</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>方式一：自反思（Self-Reflection）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  同一个 LLM 检查自己的输出：</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  Generate: &quot;根据公司政策，年假为3天...&quot;</span></span>
<span class="line"><span>  Reflect:  &quot;等等，我引用的似乎是2023年的旧版手册。</span></span>
<span class="line"><span>             我应该查看最新版本。&quot;</span></span>
<span class="line"><span>  Action:   search(&quot;2024年最新年假政策&quot;)</span></span>
<span class="line"><span>  Revise:   &quot;根据2024年最新政策，年假为5天...&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>方式二：外部评判（External Critic）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  用一个独立的 LLM 或规则来评估：</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  Generate (LLM-1): &quot;建议投资股票A、B、C...&quot;</span></span>
<span class="line"><span>  Critic (LLM-2):   &quot;这个建议缺乏风险评估，没有考虑</span></span>
<span class="line"><span>                     投资者的风险承受能力。&quot;</span></span>
<span class="line"><span>  Revise (LLM-1):   &quot;在投资前，请先评估您的风险承受能力。</span></span>
<span class="line"><span>                     股票A：低风险，适合...股票B：高风险...&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p><strong>Reflection 的价值：</strong></p><ul><li><strong>减少幻觉</strong>：自我检查能捕获明显的事实错误</li><li><strong>提高完整性</strong>：检查是否回答了问题的所有方面</li><li><strong>改善格式</strong>：检查输出是否符合要求的格式</li></ul><h2 id="_3-agent-记忆-memory" tabindex="-1">3. Agent 记忆（Memory） <a class="header-anchor" href="#_3-agent-记忆-memory" aria-label="Permalink to “3. Agent 记忆（Memory）”">​</a></h2><p>缺乏记忆的 Agent 如同每次醒来便遗忘过往之人——每轮对话皆从头开始，无从沉淀经验、持续成长。</p><h3 id="_3-1-agent-记忆的类型与层级" tabindex="-1">3.1 Agent 记忆的类型与层级 <a class="header-anchor" href="#_3-1-agent-记忆的类型与层级" aria-label="Permalink to “3.1 Agent 记忆的类型与层级”">​</a></h3><table tabindex="0"><thead><tr><th>层级</th><th>范围</th><th>生命周期</th><th>类比</th></tr></thead><tbody><tr><td><strong>工作记忆</strong> (Working Memory)</td><td>当前对话的即时状态</td><td>一次会话</td><td>人的&quot;当下正在想的事&quot;<br>好比草稿纸上的计算</td></tr><tr><td><strong>短期记忆</strong> (Short-term Memory)</td><td>最近几次对话的内容</td><td>数天~数周</td><td>人的&quot;最近发生的事&quot;<br>好比日记本</td></tr><tr><td><strong>长期记忆</strong> (Long-term Memory)</td><td>所有历史交互和知识</td><td>永久</td><td>人的&quot;知识和经验&quot;<br>好比图书馆</td></tr></tbody></table><h3 id="_3-2-工作记忆-working-memory" tabindex="-1">3.2 工作记忆（Working Memory） <a class="header-anchor" href="#_3-2-工作记忆-working-memory" aria-label="Permalink to “3.2 工作记忆（Working Memory）”">​</a></h3><p>工作记忆是 Agent 在当前任务中的&quot;临时记事本&quot;——<strong>任务完成即丢弃</strong>。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  工作记忆 = {</span></span>
<span class="line"><span>    &quot;task&quot;: &quot;安排周末户外活动&quot;,</span></span>
<span class="line"><span>    &quot;current_step&quot;: 3,           ← 当前执行到第几步</span></span>
<span class="line"><span>    &quot;findings&quot;: {                ← 已获取的信息</span></span>
<span class="line"><span>      &quot;weather&quot;: {&quot;sat&quot;: &quot;晴 25°C&quot;, &quot;sun&quot;: &quot;多云 23°C&quot;},</span></span>
<span class="line"><span>      &quot;venues&quot;: [&quot;朝阳公园&quot;, &quot;奥体中心&quot;, &quot;香山&quot;],</span></span>
<span class="line"><span>      &quot;transport&quot;: {&quot;朝阳公园&quot;: &quot;地铁14号线&quot;}</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    &quot;plan&quot;: [                    ← 剩余计划步骤</span></span>
<span class="line"><span>      &quot;查预约要求&quot;,</span></span>
<span class="line"><span>      &quot;最终推荐&quot;</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    &quot;errors&quot;: []                 ← 遇到的错误</span></span>
<span class="line"><span>  }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>工作记忆的实现方式：</strong></p><table tabindex="0"><thead><tr><th>方式</th><th>说明</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td><strong>消息历史</strong></td><td>把之前的 Thought/Action/Observation 保留在上下文中</td><td>最简单</td><td>无限增长，浪费 token</td></tr><tr><td><strong>Scratchpad</strong></td><td>在 System Prompt 中维护一个&quot;记事本&quot;区域，只保存关键信息</td><td>节省 token</td><td>需要设计更新逻辑</td></tr><tr><td><strong>结构化状态</strong></td><td>用 JSON 对象维护 Agent 状态，每步更新</td><td>清晰可解析</td><td>需要 LLM 输出结构化更新</td></tr></tbody></table><h3 id="_3-3-短期记忆-short-term-memory" tabindex="-1">3.3 短期记忆（Short-term Memory） <a class="header-anchor" href="#_3-3-短期记忆-short-term-memory" aria-label="Permalink to “3.3 短期记忆（Short-term Memory）”">​</a></h3><p>短期记忆让 Agent 记住最近的对话，跨会话保持连续。</p><p><strong>短期记忆的存储与检索</strong>：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  存储（每次对话结束后）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  对话记录 ──&gt; 摘要化 ──&gt; 存入短期记忆库</span></span>
<span class="line"><span>              │</span></span>
<span class="line"><span>              ▼</span></span>
<span class="line"><span>  例: &quot;用户在讨论Python学习计划，提到已掌握基础语法，</span></span>
<span class="line"><span>       想学习Web框架。偏好通过项目实践学习。&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  检索（每次新对话开始时）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  用户打开新对话 ──&gt; 查询记忆库: &quot;关于这个用户最近的交互&quot;</span></span>
<span class="line"><span>                    │</span></span>
<span class="line"><span>                    ▼</span></span>
<span class="line"><span>           ┌──────────────────────────────────┐</span></span>
<span class="line"><span>           │ 上下文注入:                       │</span></span>
<span class="line"><span>           │ &quot;你之前和用户讨论过Python学习，   │</span></span>
<span class="line"><span>           │  他/她已掌握基础语法，想学习      │</span></span>
<span class="line"><span>           │  Web框架，偏好项目实践。&quot;          │</span></span>
<span class="line"><span>           └──────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  实现技术：向量数据库 + Embedding</span></span>
<span class="line"><span>  - 每条记忆生成 Embedding</span></span>
<span class="line"><span>  - 新对话时用当前问题检索最相关的历史记忆</span></span>
<span class="line"><span>  - Top-K 相关记忆注入到新的对话上下文中</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="_3-4-长期记忆-long-term-memory" tabindex="-1">3.4 长期记忆（Long-term Memory） <a class="header-anchor" href="#_3-4-长期记忆-long-term-memory" aria-label="Permalink to “3.4 长期记忆（Long-term Memory）”">​</a></h3><p>长期记忆是 Agent 的&quot;终身知识库&quot;——用户偏好、领域知识、经验教训。</p><p><strong>长期记忆的三个子类</strong>：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  1. 语义记忆 (Semantic Memory)</span></span>
<span class="line"><span>     │  事实性知识</span></span>
<span class="line"><span>     │</span></span>
<span class="line"><span>     ├─ 用户信息: &quot;用户张三是后端工程师，用PyCharm&quot;</span></span>
<span class="line"><span>     ├─ 偏好设置: &quot;用户偏好简洁回答，不需要emoji&quot;</span></span>
<span class="line"><span>     ├─ 领域知识: &quot;公司代码规范要求用TypeScript严格模式&quot;</span></span>
<span class="line"><span>     └─ 常驻知识: &quot;OpenAI API key的结构是sk-...&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  2. 情节记忆 (Episodic Memory)</span></span>
<span class="line"><span>     │  过去的交互经历</span></span>
<span class="line"><span>     │</span></span>
<span class="line"><span>     ├─ &quot;上周三用户问过Python性能优化，使用了多线程方案&quot;</span></span>
<span class="line"><span>     ├─ &quot;用户对Numpy的答案表示满意，但对Pandas的回答有纠正&quot;</span></span>
<span class="line"><span>     └─ &quot;用户在上次对话中提到项目截止日期是3月15日&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  3. 程序性记忆 (Procedural Memory)</span></span>
<span class="line"><span>     │  怎么做事的经验</span></span>
<span class="line"><span>     │</span></span>
<span class="line"><span>     ├─ &quot;代码审查时应先检查架构，再检查细节&quot;</span></span>
<span class="line"><span>     ├─ &quot;处理用户投诉时先共情，再提供解决方案&quot;</span></span>
<span class="line"><span>     └─ &quot;搜索知识库应该先用BM25初筛，再向量精排&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p><strong>长期记忆的技术实现：</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  ┌──────────────────┐</span></span>
<span class="line"><span>  │   Memory Manager │  ← 记忆管理器（核心组件）</span></span>
<span class="line"><span>  └────────┬─────────┘</span></span>
<span class="line"><span>           │</span></span>
<span class="line"><span>    ┌──────┼──────────┐</span></span>
<span class="line"><span>    ▼      ▼          ▼</span></span>
<span class="line"><span>┌────────┐ ┌──────┐ ┌──────────┐</span></span>
<span class="line"><span>│  写入   │ │ 检索 │ │  整合     │</span></span>
<span class="line"><span>└───┬────┘ └──┬───┘ └─────┬────┘</span></span>
<span class="line"><span>    │         │           │</span></span>
<span class="line"><span>    ▼         ▼           ▼</span></span>
<span class="line"><span> 重要信息   当前查询     将检索到的</span></span>
<span class="line"><span>  持久化    在记忆中    记忆注入当前上下文</span></span>
<span class="line"><span>  (离线)    找到相关   </span></span>
<span class="line"><span>           信息(在线)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  写入流程：</span></span>
<span class="line"><span>  1. 判断当前交互是否有&quot;记忆价值&quot;（不是所有对话都需要记住）</span></span>
<span class="line"><span>  2. 提取关键信息：用户偏好、事实、情感标记</span></span>
<span class="line"><span>  3. 生成记忆的 Embedding 向量</span></span>
<span class="line"><span>  4. 存入向量数据库（语义记忆）+ 时间序列数据库（情节记忆）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  检索流程：</span></span>
<span class="line"><span>  1. 用户发起新对话/新任务</span></span>
<span class="line"><span>  2. 用当前查询+用户ID检索相关记忆</span></span>
<span class="line"><span>  3. Reranking 排序（时间近的、情感强的加权）</span></span>
<span class="line"><span>  4. 注入到 LLM 上下文：&quot;关于这个用户，你记得...&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="_3-5-记忆管理的关键挑战" tabindex="-1">3.5 记忆管理的关键挑战 <a class="header-anchor" href="#_3-5-记忆管理的关键挑战" aria-label="Permalink to “3.5 记忆管理的关键挑战”">​</a></h3><table tabindex="0"><thead><tr><th>挑战</th><th>说明</th><th>缓解方法</th></tr></thead><tbody><tr><td><strong>记忆膨胀</strong></td><td>随时间积累太多记忆，检索变慢且噪音增多</td><td>定期清理，重要性评分，过期淘汰</td></tr><tr><td><strong>记忆冲突</strong></td><td>用户改变偏好，新旧记忆矛盾</td><td>版本标记，新记忆覆盖旧记忆</td></tr><tr><td><strong>隐私</strong></td><td>记忆含敏感信息，安全风险大</td><td>本地存储加密，用户可删除</td></tr><tr><td><strong>幻觉记忆</strong></td><td>LLM 可能将虚构内容写入记忆</td><td>关键记忆需人工确认</td></tr><tr><td><strong>跨会话一致性</strong></td><td>不同会话可能有不同的 Agent 实例</td><td>集中式记忆服务</td></tr></tbody></table><h2 id="_4-multi-agent-多智能体协作" tabindex="-1">4. Multi-Agent（多智能体协作） <a class="header-anchor" href="#_4-multi-agent-多智能体协作" aria-label="Permalink to “4. Multi-Agent（多智能体协作）”">​</a></h2><p>一个 Agent 能做的事有限。当任务足够复杂时，需要多个 Agent 分工协作——就像公司不是一个员工，而是一个团队。</p><h3 id="_4-1-为什么需要-multi-agent" tabindex="-1">4.1 为什么需要 Multi-Agent？ <a class="header-anchor" href="#_4-1-为什么需要-multi-agent" aria-label="Permalink to “4.1 为什么需要 Multi-Agent？”">​</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>单 Agent 的局限性 vs Multi-Agent 的优势</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  单 Agent:</span></span>
<span class="line"><span>  ┌──────────┐</span></span>
<span class="line"><span>  │ 一个大脑  │  → 认知负载过重 → 顾此失彼</span></span>
<span class="line"><span>  │ 做所有事  │  → 功能耦合 → 难以优化</span></span>
<span class="line"><span>  │ 看一个角度│  → 单一视角 → 容易出错</span></span>
<span class="line"><span>  └──────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Multi-Agent:</span></span>
<span class="line"><span>  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐</span></span>
<span class="line"><span>  │ 研究员│ │ 分析家│ │ 作家  │ │ 审查者│</span></span>
<span class="line"><span>  │ 收集  │ │ 分析  │ │ 撰写  │ │ 检查  │</span></span>
<span class="line"><span>  │ 信息  │ │ 数据  │ │ 报告  │ │ 质量  │</span></span>
<span class="line"><span>  └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘</span></span>
<span class="line"><span>     │        │        │        │</span></span>
<span class="line"><span>     └────────┴────────┴────────┘</span></span>
<span class="line"><span>               协同工作</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p><strong>Multi-Agent 的核心优势：</strong></p><table tabindex="0"><thead><tr><th>优势</th><th>说明</th></tr></thead><tbody><tr><td><strong>分而治之</strong></td><td>每个 Agent 专注一个子任务，降低个体认知负载</td></tr><tr><td><strong>多视角</strong></td><td>不同 Agent 带来不同视角，减少盲点</td></tr><tr><td><strong>专业化</strong></td><td>每个 Agent 可以有不同的 System Prompt、工具、知识库</td></tr><tr><td><strong>鲁棒性</strong></td><td>一个 Agent 出错不影响整体（需要设计容错）</td></tr><tr><td><strong>可扩展</strong></td><td>增加新 Agent 即可扩展新能力</td></tr></tbody></table><h3 id="_4-2-协作模式" tabindex="-1">4.2 协作模式 <a class="header-anchor" href="#_4-2-协作模式" aria-label="Permalink to “4.2 协作模式”">​</a></h3><h4 id="_4-2-1-顺序协作-sequential" tabindex="-1">4.2.1 顺序协作（Sequential） <a class="header-anchor" href="#_4-2-1-顺序协作-sequential" aria-label="Permalink to “4.2.1 顺序协作（Sequential）”">​</a></h4><p>Agent A 完成后，把结果交给 Agent B，像流水线一样。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  原始需求 ──&gt; Agent 研究 ──&gt; Agent 分析 ──&gt; Agent 写作 ──&gt; 最终输出</span></span>
<span class="line"><span>              (收集资料)      (分析数据)      (撰写报告)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  适用场景：步骤之间有明确前后依赖的任务</span></span>
<span class="line"><span>  优点：逻辑清晰、易于调试</span></span>
<span class="line"><span>  缺点：慢（必须等前一步完成）、一旦某步出错后面全错</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="_4-2-2-并行协作-parallel" tabindex="-1">4.2.2 并行协作（Parallel） <a class="header-anchor" href="#_4-2-2-并行协作-parallel" aria-label="Permalink to “4.2.2 并行协作（Parallel）”">​</a></h4><p>多个 Agent 同时工作，最后汇总（Map-Reduce）。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  原始需求</span></span>
<span class="line"><span>      │</span></span>
<span class="line"><span>      ├──&gt; Agent A: 从员工手册找信息 ──┐</span></span>
<span class="line"><span>      ├──&gt; Agent B: 从OA系统找信息  ──┤</span></span>
<span class="line"><span>      ├──&gt; Agent C: 从FAQ找信息     ──┼──&gt; 汇总 Agent ──&gt; 最终输出</span></span>
<span class="line"><span>      └──&gt; Agent D: 从公告找信息    ──┘   (融合结果)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  适用场景：独立子任务、多源信息收集</span></span>
<span class="line"><span>  优点：快（并行执行）</span></span>
<span class="line"><span>  缺点：汇总 Agent 需要处理可能冲突的信息</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="_4-2-3-辩论协作-debate" tabindex="-1">4.2.3 辩论协作（Debate） <a class="header-anchor" href="#_4-2-3-辩论协作-debate" aria-label="Permalink to “4.2.3 辩论协作（Debate）”">​</a></h4><p><strong>多个 Agent 对同一问题给出不同答案，通过辩论选出最佳方案。</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>  问题: &quot;应该用微服务还是单体架构？&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Round 1 — 陈述立场：</span></span>
<span class="line"><span>  Agent A: &quot;用微服务，因为...（3个理由）&quot;</span></span>
<span class="line"><span>  Agent B: &quot;用单体，因为...（3个理由）&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Round 2 — 反驳：</span></span>
<span class="line"><span>  Agent A: &quot;你的第一个论点有漏洞，因为...&quot;</span></span>
<span class="line"><span>  Agent B: &quot;你忽略了微服务的运维成本...&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  Round 3 — 修正与共识：</span></span>
<span class="line"><span>  Agent A: &quot;我同意运维成本是个问题，可以考虑折中方案...&quot;</span></span>
<span class="line"><span>  Agent B: &quot;折中方案可以考虑模块化单体...&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  裁判 Agent:</span></span>
<span class="line"><span>  &quot;综合考虑，建议采用模块化单体架构，保留未来拆分微服务的可能性...&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  适用场景：有争议的决策、需要严谨推理的问题</span></span>
<span class="line"><span>  优点：多角度审视，减少偏见</span></span>
<span class="line"><span>  缺点：慢、消耗更多 token</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h4 id="_4-2-4-层级协作-hierarchical-orchestrator-worker" tabindex="-1">4.2.4 层级协作（Hierarchical / Orchestrator+Worker） <a class="header-anchor" href="#_4-2-4-层级协作-hierarchical-orchestrator-worker" aria-label="Permalink to “4.2.4 层级协作（Hierarchical / Orchestrator+Worker）”">​</a></h4><p><strong>一个&quot;主管&quot; Agent 分配任务给多个&quot;工人&quot; Agent，这是最常用且最灵活的协作模式</strong>。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Orchestrator + Worker 层级架构</span></span>
<span class="line"><span>═══════════════════════════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>                      ┌──────────────────┐</span></span>
<span class="line"><span>                      │   Orchestrator    │</span></span>
<span class="line"><span>                      │   (编排者/主管)    │</span></span>
<span class="line"><span>                      │                  │</span></span>
<span class="line"><span>                      │  职责:           │</span></span>
<span class="line"><span>                      │  • 分析任务       │</span></span>
<span class="line"><span>                      │  • 制定计划       │</span></span>
<span class="line"><span>                      │  • 分配给 Worker  │</span></span>
<span class="line"><span>                      │  • 监控进度       │</span></span>
<span class="line"><span>                      │  • 汇总结果       │</span></span>
<span class="line"><span>                      └────────┬─────────┘</span></span>
<span class="line"><span>                               │</span></span>
<span class="line"><span>              ┌────────────────┼────────────────┐</span></span>
<span class="line"><span>              │                │                │</span></span>
<span class="line"><span>              ▼                ▼                ▼</span></span>
<span class="line"><span>     ┌────────────┐   ┌────────────┐   ┌────────────┐</span></span>
<span class="line"><span>     │  Worker A  │   │  Worker B  │   │  Worker C  │</span></span>
<span class="line"><span>     │  (搜索员)  │    │  (分析师)   │   │  (写作员)  │</span></span>
<span class="line"><span>     │            │   │            │   │            │</span></span>
<span class="line"><span>     │ 工具:      │    │ 工具:      │   │ 工具:      │</span></span>
<span class="line"><span>     │ web_search │   │ calculator │   │ word_export│</span></span>
<span class="line"><span>     │ doc_search │   │ chart_gen  │   │ email_send │</span></span>
<span class="line"><span>     └────────────┘   └────────────┘   └────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p><strong>Orchestrator 的工作流程示例：</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>任务：写一份关于AI行业2025趋势的研究报告</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Orchestrator 的思考：</span></span>
<span class="line"><span>  这个任务可以分解为：调研 → 分析 → 撰写</span></span>
<span class="line"><span>  需要 3 个 Worker。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Orchestrator → Worker A (研究员):</span></span>
<span class="line"><span>  &quot;请搜索2025年AI行业的最新趋势，包括但不限于：</span></span>
<span class="line"><span>   1. 大模型技术进展</span></span>
<span class="line"><span>   2. AI应用落地情况</span></span>
<span class="line"><span>   3. 投融资趋势</span></span>
<span class="line"><span>   4. 政策法规变化</span></span>
<span class="line"><span>   请返回结构化的调研摘要。&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Worker A 返回后...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Orchestrator → Worker B (分析师):</span></span>
<span class="line"><span>  &quot;这是调研数据，请做以下分析：</span></span>
<span class="line"><span>   1. 识别 3~5 个最显著的趋势</span></span>
<span class="line"><span>   2. 预测各趋势的发展方向</span></span>
<span class="line"><span>   3. 列出关键数据支撑&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Worker B 返回后...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Orchestrator → Worker C (写作员):</span></span>
<span class="line"><span>  &quot;这是研究和分析结果，请撰写一份专业的行业研究报告。</span></span>
<span class="line"><span>   格式要求：执行摘要 + 趋势分析 + 展望建议&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Worker C 返回后...</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Orchestrator: 审核报告质量 → 修正小问题 → 提交给用户</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h3 id="_4-3-agent-间通信" tabindex="-1">4.3 Agent 间通信 <a class="header-anchor" href="#_4-3-agent-间通信" aria-label="Permalink to “4.3 Agent 间通信”">​</a></h3><p>Agent 之间的通信是构建多智能体系统（Multi-Agent System）的核心。Agent 通常通过<strong>统一的通信协议</strong>、<strong>消息队列</strong>或<strong>共享知识库</strong>进行交互，实现任务委派与协同。</p><p>Agent 之间如何&quot;说话&quot;？有几种通信方式：</p><table tabindex="0"><thead><tr><th>通信方式</th><th>说明</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td><strong>消息传递</strong></td><td>Agent A 输出自然语言消息给 Agent B</td><td>最灵活，类人交流</td><td>无结构化，可能歧义</td></tr><tr><td><strong>共享黑板</strong></td><td>所有 Agent 读写一个共享数据结构</td><td>适合多对多协作</td><td>需要并发控制</td></tr><tr><td><strong>函数调用</strong></td><td>Agent B 作为 Agent A 的一个&quot;工具&quot;出现</td><td>结构化，可类型检查</td><td>耦合度高</td></tr><tr><td><strong>事件总线</strong></td><td>Agent 发布/订阅事件</td><td>松耦合，可扩展</td><td>调试困难</td></tr></tbody></table><p>四种方式不是平行的——它们适合完全不同的场景。选错通信方式会导致系统脆弱、调试噩梦或性能瓶颈。下面逐一分析每种方式的适用边界和典型坑。</p><h4 id="_4-3-1-消息传递-message-passing" tabindex="-1">4.3.1 消息传递（Message Passing） <a class="header-anchor" href="#_4-3-1-消息传递-message-passing" aria-label="Permalink to “4.3.1 消息传递（Message Passing）”">​</a></h4><p>这是最&quot;原生&quot;的方式：Agent A 把自己的输出作为自然语言文本发给 Agent B，Agent B 把它当作 user message 来理解和处理。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Agent A → &quot;根据分析，建议关注三个方向：新能源、AI 医疗、低空经济&quot;</span></span>
<span class="line"><span>           │</span></span>
<span class="line"><span>Agent B  ← 把这行文本当成用户指令，理解后继续工作</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>什么时候用</strong>：</p><ul><li>上下游任务本身只有<strong>自然语言</strong>这个接口能承载（比如 A 做完研究，B 撰写报告——研究报告天然就是文本）</li><li>需要 Agent B 对上游结果做<strong>自由理解和二次加工</strong>，而不是机械地解析结构化字段</li><li>团队是不同供应商/不同模型组成的异构 Agent——只有自然语言是通用「协议」</li></ul><p><strong>什么时候不该用</strong>：</p><ul><li>需要精确的数值、状态码、决策结果传递——自然语言的歧义会在这里被放大</li><li>关键路径上的 Agent 链——上游的一句话歧义会导致下游全线偏差</li></ul><p><strong>核心坑</strong>：歧义传播与截断。A 说&quot;Q3 表现一般&quot;——B 怎么理解&quot;一般&quot;？是差还是中等？此外，A 的输出如果很长，B 的上下文窗口可能装不下，需要人为截断或摘要，这又引入了一轮信息损失。</p><h4 id="_4-3-2-共享黑板-blackboard" tabindex="-1">4.3.2 共享黑板（Blackboard） <a class="header-anchor" href="#_4-3-2-共享黑板-blackboard" aria-label="Permalink to “4.3.2 共享黑板（Blackboard）”">​</a></h4><p>所有 Agent 共享同一个结构化数据结构（通常是 JSON 或 Key-Value Store），Agent 可以读写这个结构的任意字段。类似于多个厨师共用同一份点菜单——谁完成了就把自己的结果填进去，谁被阻塞了就看谁还没填。</p><p>黑板状态（任何 Agent 都能读写的共享结构）：</p><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;task&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Q3 行业分析报告&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;status&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;in-progress&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;research_done&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;research_findings&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;新能源增长 15%、AI 医疗融资活跃 ...&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;draft_written&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;chart_generated&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;errors&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: []</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>什么时候用</strong>：</p><ul><li><strong>多对多协作</strong>——研究 Agent、写作 Agent、图表 Agent 需要读彼此成果（写作需要看研究结论，图表需要看写作中的数据）</li><li><strong>需要状态追踪</strong>——知道任务到哪一步了，哪些子任务已完成、哪些阻塞了</li><li><strong>结果需要汇总到一处</strong>——最终报告由多个 Agent 的输出拼装而成</li></ul><p><strong>什么时候不该用</strong>：</p><ul><li>两个 Agent 之间有严格的顺序依赖（A 的完整结果必须给 B）——这时消息传递更直接</li><li>黑板本身成为瓶颈，所有 Agent 排队读写</li></ul><p><strong>核心坑</strong>：不需要用 Redis 和锁。实践中大多数 Agent 黑板复杂度远低于数据库——通常是内存 JSON 或简单 Key-Value Store。真正容易出现的问题是<strong>字段命名打架</strong>：Agent A 写入 <code>research_findings</code>，Agent B 以为字段叫 <code>findings</code>，结果读到空值继续跑——系统看起来一切正常，其实数据根本没传过去。</p><h4 id="_4-3-3-函数调用-tool-as-agent-function-calling" tabindex="-1">4.3.3 函数调用（Tool-as-Agent / Function Calling） <a class="header-anchor" href="#_4-3-3-函数调用-tool-as-agent-function-calling" aria-label="Permalink to “4.3.3 函数调用（Tool-as-Agent / Function Calling）”">​</a></h4><p>这是最&quot;硬&quot;的方式：Agent A 把 Agent B 注册为自己的一个 Tool（函数），调用方式和调用搜索引擎 API、数据库查询完全相同——输入参数结构化，返回结果结构化。</p><p>Agent A（规划者）调用 Agent B（计算器）：</p><div class="language-typescript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  function_call</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;calculate_roi&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;investment&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1000000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;returns&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1500000</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  → 返回：{</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;roi&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;50%&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;payback_months&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">14</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Function Calling JSON Schema：</p><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;name&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;calculate_roi&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;计算投资回报率&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;parameters&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;object&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;properties&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;investment&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;number&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;投资金额&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;returns&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;number&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">&quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;回报金额&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;required&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;investment&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;returns&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><strong>什么时候用</strong>：</p><ul><li>Agent B 的任务是<strong>确定性计算或结构性操作</strong>——查数据库、算数学、调 API</li><li>需要<strong>类型校验</strong>——输入输出格式可以事先定义，不会出现字段名猜谜</li><li>主从关系明确——A 是规划者/编排者，B 是执行者/工具，不存在双向对话</li></ul><p><strong>什么时候不该用</strong>：</p><ul><li>Agent B 需要根据上下文做<strong>创意性判断和自由推理</strong>——函数调用的入参出参太死板，会把开放性任务压扁到 Schema 里</li><li><strong>耦合</strong>：A 必须知道 B 的接口细节（参数定义、返回字段），换一个供应商的 B 就得改代码</li></ul><p><strong>核心坑</strong>：把需要创意或自由判断的任务强行塞进结构化 Schema——比如让写作 Agent 返回 <code>{&quot;title&quot;: &quot;...&quot;, &quot;body&quot;: &quot;...&quot;, &quot;tone_score&quot;: 0.8}</code>。Schema 一多、字段一复杂，模型就频繁触发格式错误，调试比消息传递痛苦十倍。</p><h4 id="_4-3-4-事件总线-event-bus-pub-sub" tabindex="-1">4.3.4 事件总线（Event Bus / Pub-Sub） <a class="header-anchor" href="#_4-3-4-事件总线-event-bus-pub-sub" aria-label="Permalink to “4.3.4 事件总线（Event Bus / Pub-Sub）”">​</a></h4><p>Agent 发布事件到总线，所有订阅了该事件的 Agent 都会收到通知，自行决定是否处理。这是一种「广播后等待自愿者」的模式——不像消息传递那样一对一，不像黑板那样被动读写。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Agent A 发布事件： &quot;research_completed&quot;，附带研究成果</span></span>
<span class="line"><span>          │</span></span>
<span class="line"><span>Event Bus ─┼──→ Agent B (写作员) 收到 → &quot;有人做完了研究，我该开始写报告了&quot;</span></span>
<span class="line"><span>          │</span></span>
<span class="line"><span>          └──→ Agent C (审核员) 收到 → &quot;有新内容产出，我该检查一下&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>什么时候用</strong>：</p><ul><li>Agent 数量多且<strong>动态扩展</strong>——新增一个翻译 Agent，它只需要订阅 <code>report_completed</code> 事件，不改任何现有代码</li><li><strong>松耦合是刚需</strong>——发布者不知道也不应该知道谁会消费这个事件</li><li>需要<strong>异步处理</strong>——发布事件后不管，消费方自己决定何时处理</li></ul><p><strong>什么时候不该用</strong>：</p><ul><li>只有 2-3 个 Agent 的简单协作——事件总线是杀鸡用牛刀</li><li><strong>确定性要求高</strong>：你不知道谁会处理、什么时候处理、处理完了没有——调试时溯源极其困难</li><li><strong>需要返回值</strong>：事件总线本身不具备 request-response 能力，需要额外机制</li></ul><p><strong>核心坑</strong>：调试成本。事件跑飞了、没人处理、处理了两次、顺序出错了——看日志要看多个 Agent 的时间线交叉比对。此外，没有「请求-响应」模式：Agent A 想知道自己的事件是否被正确处理了，需要额外的确认机制。</p><h4 id="_4-3-5-选型建议" tabindex="-1">4.3.5 选型建议 <a class="header-anchor" href="#_4-3-5-选型建议" aria-label="Permalink to “4.3.5 选型建议”">​</a></h4><p>场景驱动的选型：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span></span></span>
<span class="line"><span>两个 Agent，A 产结果 B 加工？</span></span>
<span class="line"><span>  → 消息传递（最简单，最直接）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>多个 Agent 需要协作完成同一份产物？</span></span>
<span class="line"><span>  → 共享黑板（天然支持多对多状态共享）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>B 是 A 的确定性工具（查 API / 算数据 / 格式转换）？</span></span>
<span class="line"><span>  → 函数调用（结构化、可校验、无歧义）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>N 个 Agent 动态组合、希望低耦合和可扩展？</span></span>
<span class="line"><span>  → 事件总线（但要做好心理准备：调试会很痛苦）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>小规模协作（2-3 Agent）？</span></span>
<span class="line"><span>  → 消息传递就够了，不要引入黑板或事件总线的复杂度</span></span>
<span class="line"><span></span></span>
<span class="line"><span>异构 Agent 跨组织协作？？</span></span>
<span class="line"><span>  → 消息传递（自然语言是唯一的通用协议）。也可以考虑 A2A 协议（见 [[6-2-Agent协议]]）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>共享黑板模式</span></span>
<span class="line"><span>═══════════════════════════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          ┌───────────────────────────────────────┐</span></span>
<span class="line"><span>          │              共享黑板                  │</span></span>
<span class="line"><span>          │                                      │</span></span>
<span class="line"><span>          │  {                                   │</span></span>
<span class="line"><span>          │    &quot;task&quot;: &quot;Q3 报告&quot;,                 │</span></span>
<span class="line"><span>          │    &quot;status&quot;: &quot;analyzing&quot;,             │</span></span>
<span class="line"><span>          │    &quot;findings&quot;: {                      │</span></span>
<span class="line"><span>          │      &quot;revenue&quot;: &quot;增长15%&quot;,            │</span></span>
<span class="line"><span>          │      &quot;cost&quot;: &quot;控制良好&quot;               │</span></span>
<span class="line"><span>          │    },                                 │</span></span>
<span class="line"><span>          │    &quot;pending_tasks&quot;: [                 │</span></span>
<span class="line"><span>          │      &quot;写复盘分析&quot;,                     │</span></span>
<span class="line"><span>          │      &quot;画趋势图&quot;                       │</span></span>
<span class="line"><span>          │    ]                                  │</span></span>
<span class="line"><span>          │  }                                   │</span></span>
<span class="line"><span>          └───┬───────────┬───────────┬───────────┘</span></span>
<span class="line"><span>              │           │           │</span></span>
<span class="line"><span>      ┌───────▼──┐  ┌────▼─────┐  ┌─▼──────────┐</span></span>
<span class="line"><span>      │ Agent A  │  │ Agent B  │  │ Agent C    │</span></span>
<span class="line"><span>      │ (数据)   │  │ (分析)    │  │ (图表)     │</span></span>
<span class="line"><span>      └──────────┘  └──────────┘  └────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="_4-4-multi-agent-的工程挑战" tabindex="-1">4.4 Multi-Agent 的工程挑战 <a class="header-anchor" href="#_4-4-multi-agent-的工程挑战" aria-label="Permalink to “4.4 Multi-Agent 的工程挑战”">​</a></h3><table tabindex="0"><thead><tr><th>挑战</th><th>描述</th><th>缓解方法</th></tr></thead><tbody><tr><td><strong>编排复杂度</strong></td><td>多个 Agent 的协调和调度</td><td>使用成熟的编排框架（LangGraph/AutoGen）</td></tr><tr><td><strong>成本</strong></td><td>每个 Agent 都消耗 LLM 调用</td><td>小模型做简单任务，大模型做关键任务</td></tr><tr><td><strong>延迟</strong></td><td>多轮通信增加耗时</td><td>并行化、使用异步通信</td></tr><tr><td><strong>一致性问题</strong></td><td>多个 Agent 可能产出矛盾结果</td><td>设置冲突解决机制（投票/优先级）</td></tr><tr><td><strong>错误传播</strong></td><td>上游 Agent 的错误被下游放大</td><td>添加验证 Agent 把关</td></tr><tr><td><strong>&quot;人多嘴杂&quot;</strong></td><td>Agent 太多可能降低效率而不是提升</td><td>严格控制 Agent 数量（一般 3~5 个为宜）</td></tr></tbody></table><h2 id="_5-总结" tabindex="-1">5. 总结 <a class="header-anchor" href="#_5-总结" aria-label="Permalink to “5. 总结”">​</a></h2><p>Agent 标志着 LLM 应用从&quot;对话工具&quot;向&quot;智能助手&quot;的关键跃迁。以下是 Agent 核心概念的精炼总结：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>═══════════════════════════════════════════════════════════════════</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  概念              一句话总结</span></span>
<span class="line"><span>  ──────────────────────────────────────────────────────────────</span></span>
<span class="line"><span>  Agent 定义         LLM + 工具 + 记忆 + 规划 = 能自主完成任务的 AI</span></span>
<span class="line"><span>  ReAct              每一步都&quot;边想边做&quot;，是大多数Agent的基础</span></span>
<span class="line"><span>  Plan-and-Execute   先制定完整计划再执行，适合步骤可预期的任务</span></span>
<span class="line"><span>  Reflection         生成后自我检查并修正，减少错误和幻觉</span></span>
<span class="line"><span>  工作记忆           当前任务中的临时信息，任务结束即丢弃</span></span>
<span class="line"><span>  短期记忆           跨会话的最近交互历史</span></span>
<span class="line"><span>  长期记忆           用户偏好、知识、经验的永久存储</span></span>
<span class="line"><span>  Multi-Agent        多Agent分工协作，处理单个Agent无法完成的复杂任务</span></span>
<span class="line"><span>  Orchestrator+Worker 最常用的协作模式：主管分配任务，工人执行</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>关键要点：</strong></p><ol><li>Agent 与 Chatbot 的本质区别是<strong>自主性</strong>——Agent 能自主规划、执行、反思。</li><li>ReAct 是最基础的 Agent 模式，Plan-and-Execute 和 Reflection 分别解决规划和质检问题。</li><li>记忆是 Agent 的灵魂——没有记忆的 Agent 永远在&quot;重新开始&quot;。</li><li>Multi-Agent 不是&quot;越多越好&quot;——3~5 个专业 Agent 通常比 10 个通用 Agent 效果好。</li><li>每增加一个 Agent 就增加一份成本和复杂度，设计时需要权衡。</li></ol>`,101))]))}});export{q as __pageData,A as default};
