/* empty css                                                                               *//* empty css                                                             */import{c as n,o as a,d as p}from"./chunks/vitepress-theme-teek.Cn3pDl2f.js";const b=JSON.parse('{"title":"大模型推理部署：硬件、引擎、并行策略与连续批处理","description":"系统梳理大模型推理部署的完整技术栈，涵盖GPU/NPU/TPU硬件选型与显存规划、vLLM/SGLang/TensorRT-LLM/llama.cpp/Ollama五大推理引擎对比、张量/流水线/数据/专家四种并行策略，以及Continuous Batching的调度机制与GPU利用率优化实践。","frontmatter":{"date":"2026-06-20T13:24:58.000Z","title":"大模型推理部署：硬件、引擎、并行策略与连续批处理","tldr":"推理部署需硬件、引擎、并行、批处理四维协同优化，最佳方案取决于模型规模与流量特征。","description":"系统梳理大模型推理部署的完整技术栈，涵盖GPU/NPU/TPU硬件选型与显存规划、vLLM/SGLang/TensorRT-LLM/llama.cpp/Ollama五大推理引擎对比、张量/流水线/数据/专家四种并行策略，以及Continuous Batching的调度机制与GPU利用率优化实践。","tags":["Deployment","GPU","vLLM"],"categories":["大模型基础","推理与生成"],"permalink":"/llm-basic/inference-deployment"},"headers":[],"relativePath":"llm-basic/inference-deployment.md","filePath":"22.大模型基础/04.推理与生成/09.推理部署基础设施.md"}'),l={name:"llm-basic/inference-deployment.md"},u=Object.assign(l,{setup(e){return(i,s)=>(a(),n("div",null,[...s[0]||(s[0]=[p(`<h1 id="大模型推理部署-硬件、引擎、并行策略与连续批处理" tabindex="-1">大模型推理部署：硬件、引擎、并行策略与连续批处理 <a class="header-anchor" href="#大模型推理部署-硬件、引擎、并行策略与连续批处理" aria-label="Permalink to “大模型推理部署：硬件、引擎、并行策略与连续批处理”">​</a></h1><blockquote><p><strong>摘要</strong>: 从硬件基础、推理引擎、并行策略和连续批处理四个维度系统阐述了大模型推理部署的技术体系。硬件层面，详细对比了主流GPU型号的显存与带宽指标，解析了显存需求与模型规模的关系公式，并介绍了 TPU/NPU 等专用加速器。推理引擎层面，深入分析了 vLLM 的 PagedAttention 显存管理、SGLang的 RadixAttention 前缀缓存、TensorRT-LLM 的极致 NVIDIA 优化、llama.cpp 的 CPU 推理能力以及 Ollama 的本地部署工具链。并行策略层面，对比了张量并行（TP）、流水线并行（PP）、数据并行（DP）和专家并行（EP）的切分方式、通信模式与适用场景。最后，详细阐述了 Continuous Batching 相比传统静态批处理的性能优势与动态调度策略，给出了 GPU 利用率优化与生产部署的成本估算参考。</p></blockquote><div class="note custom-block github-alert"><p class="custom-block-title">核心问题</p><p></p><p>大模型训练完成后，如何高效地把它&quot;跑起来&quot;服务用户？本章从硬件到软件、从单卡到集群，系统讲解大模型推理部署的核心技术与实践考量。</p></div><h2 id="_1-硬件基础" tabindex="-1">1. 硬件基础 <a class="header-anchor" href="#_1-硬件基础" aria-label="Permalink to “1. 硬件基础”">​</a></h2><p>大模型推理对硬件的要求远超传统 Web 服务。理解硬件的各项指标，是做好部署规划的第一步。</p><h3 id="_1-1-gpu-图形处理器" tabindex="-1">1.1 GPU（图形处理器） <a class="header-anchor" href="#_1-1-gpu-图形处理器" aria-label="Permalink to “1.1 GPU（图形处理器）”">​</a></h3><p>GPU 是大模型推理的核心计算硬件。理解不同 GPU 型号的差异，就像汽车工程师理解不同发动机型号一样重要。</p><p><strong>主流 GPU 型号对比</strong></p><table tabindex="0"><thead><tr><th>型号</th><th>显存 (VRAM)</th><th>显存带宽</th><th>FP16 算力 (TFLOPS)</th><th>功耗</th><th>典型用途</th><th>上市时间</th></tr></thead><tbody><tr><td>A100 80GB</td><td>80 GB</td><td>2.0 TB/s</td><td>312</td><td>400W</td><td>训练+推理主力</td><td>2021</td></tr><tr><td>H100 80GB</td><td>80 GB</td><td>3.35 TB/s</td><td>989</td><td>700W</td><td>当前训练/推理旗舰</td><td>2023</td></tr><tr><td>H200 141GB</td><td>141 GB</td><td>4.8 TB/s</td><td>989</td><td>700W</td><td>大显存推理</td><td>2024</td></tr><tr><td>B200 192GB</td><td>192 GB</td><td>8.0 TB/s</td><td>~2,250</td><td>1000W</td><td>下一代旗舰</td><td>2025</td></tr><tr><td>RTX 4090</td><td>24 GB</td><td>1.0 TB/s</td><td>83</td><td>450W</td><td>本地实验/调试</td><td>2022</td></tr><tr><td>A10</td><td>24 GB</td><td>0.6 TB/s</td><td>31</td><td>150W</td><td>云端轻量推理</td><td>2021</td></tr><tr><td>L40S</td><td>48 GB</td><td>0.86 TB/s</td><td>91</td><td>350W</td><td>中等负载推理</td><td>2023</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">如何选择 GPU？</p><p>对于一个需要部署的模型，显存是最关键的约束条件。 <strong>核心公式：所需显存 = 模型大小 + KV Cache + 其他开销</strong></p></div><p><strong>VRAM 与模型规模的关系（FP16 推理）</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>模型参数与显存需求的关系：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>参数数量 × 2 字节（FP16）= 纯模型权重的显存</span></span>
<span class="line"><span></span></span>
<span class="line"><span>模型大小    权重显存    推荐总显存（含开销）    单卡能跑吗？</span></span>
<span class="line"><span>────────────────────────────────────────────────────</span></span>
<span class="line"><span>1B          2 GB        4 GB           ✓ 几乎所有卡都能</span></span>
<span class="line"><span>3B          6 GB        10 GB          ✓ RTX 3060(12GB) 即可</span></span>
<span class="line"><span>7B          14 GB       20 GB          ✓ 单张 A10 / 双张 4090</span></span>
<span class="line"><span>8B          16 GB       22 GB          ✓ 单张 A10</span></span>
<span class="line"><span>13B         26 GB       34 GB          ✓ 单张 A100-40GB</span></span>
<span class="line"><span>34B         68 GB       80 GB          ✓ 双张 A100-80GB</span></span>
<span class="line"><span>70B         140 GB      160 GB         ✗ 需要 2-4 张 A100/H100</span></span>
<span class="line"><span>405B (Llama)810 GB      900 GB+        ✗ 需要 8+ 张 H100/B200</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>为什么显存带宽比算力更重要（对于推理）</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>推理的本质：逐个生成 token</span></span>
<span class="line"><span></span></span>
<span class="line"><span>每生成一个 token 的过程：</span></span>
<span class="line"><span>┌──────────────┐     ┌──────────────┐     ┌──────────────┐</span></span>
<span class="line"><span>│ 从显存读权重   │ ──→ │ 做矩阵乘法     │ ──→ │ 得到下一个     │</span></span>
<span class="line"><span>│ (内存密集)     │     │ (计算密集)     │     │ token (输出)  │</span></span>
<span class="line"><span>└──────────────┘     └──────────────┘     └──────────────┘</span></span>
<span class="line"><span>      ↑                     ↑</span></span>
<span class="line"><span>   时间占比 ~60-80%      时间占比 ~20-40%</span></span>
<span class="line"><span></span></span>
<span class="line"><span>因为大部分时间花在&quot;搬运数据&quot;上而不是&quot;计算&quot;上</span></span>
<span class="line"><span>所以显存带宽比理论算力更能决定推理速度！</span></span>
<span class="line"><span></span></span>
<span class="line"><span>类比：工厂流水线</span></span>
<span class="line"><span>算力 = 工人处理速度</span></span>
<span class="line"><span>显存带宽 = 原材料传送带速度</span></span>
<span class="line"><span></span></span>
<span class="line"><span>传送带太慢，工人再快也只能等待</span></span>
<span class="line"><span>这就是为什么 H100 带宽升级对推理提升显著</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="_1-2-tpu-npu-专用-ai-加速器" tabindex="-1">1.2 TPU / NPU（专用 AI 加速器） <a class="header-anchor" href="#_1-2-tpu-npu-专用-ai-加速器" aria-label="Permalink to “1.2 TPU / NPU（专用 AI 加速器）”">​</a></h3><p>除了 NVIDIA GPU，不同厂商也推出了各自的 AI 加速芯片。</p><ul><li><strong>TPU（Tensor Processing Unit）</strong>：Google 自研，Cloud TPU v5p 单芯片提供 459 TFLOPS BF16 算力，适合大规模训练和推理</li><li><strong>Apple Neural Engine</strong>：集成在 Apple Silicon（M1/M2/M3/M4）中，ANe 提供高效的本地推理，是 llama.cpp 在 Mac 上运行的关键加速硬件</li><li><strong>华为昇腾（Ascend）</strong>：国产 NPU，910B 对标 A100，用于国内推理部署场景</li><li><strong>高通 Hexagon NPU</strong>：移动端推理，让大模型在手机上运行成为可能</li></ul><p><strong>GPU vs TPU vs NPU 的选择考量</strong></p><table tabindex="0"><thead><tr><th>维度</th><th>GPU (NVIDIA)</th><th>TPU (Google)</th><th>NPU (国产/移动端)</th></tr></thead><tbody><tr><td>生态成熟度</td><td>最高（CUDA）</td><td>高（JAX/TF）</td><td>发展中</td></tr><tr><td>硬件自由度</td><td>云/自建均可</td><td>仅 Google Cloud</td><td>受限</td></tr><tr><td>软件兼容性</td><td>几乎所有框架</td><td>PyTorch/XLA 适配中</td><td>需要专门适配</td></tr><tr><td>成本</td><td>高（供需紧张）</td><td>中（预付费/包年）</td><td>中低</td></tr><tr><td>推理场景</td><td>通用最佳</td><td>大规模高吞吐</td><td>端侧/国产替代</td></tr></tbody></table><h3 id="_1-3-显存-vram-与模型规模的关系详解" tabindex="-1">1.3 显存（VRAM）与模型规模的关系详解 <a class="header-anchor" href="#_1-3-显存-vram-与模型规模的关系详解" aria-label="Permalink to “1.3 显存（VRAM）与模型规模的关系详解”">​</a></h3><p>GPU 显存在推理阶段的消耗可以分为几个部分：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│              显存消耗全景图（推理时）                 │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                    │</span></span>
<span class="line"><span>│  ┌──────────────────────────┐                     │</span></span>
<span class="line"><span>│  │  1. 模型权重（Model Weights）                    │</span></span>
<span class="line"><span>│  │  参数数 × 每参数字节数                           │</span></span>
<span class="line"><span>│  │  例：7B FP16 = 7B × 2B = 14 GB                │</span></span>
<span class="line"><span>│  │  例：7B INT4 = 7B × 0.5B = 3.5 GB             │</span></span>
<span class="line"><span>│  └──────────────────────────┘                     │</span></span>
<span class="line"><span>│                                                    │</span></span>
<span class="line"><span>│  ┌──────────────────────────┐                     │</span></span>
<span class="line"><span>│  │  2. KV Cache（键值缓存）                         │</span></span>
<span class="line"><span>│  │  对每个已生成的 token，需要存储其 K 和 V 矩阵     │</span></span>
<span class="line"><span>│  │  公式：2 × 层数 × 隐藏维度 × token数 × 字节/元素  │</span></span>
<span class="line"><span>│  │  例：7B 模型，4096 token 上下文 ≈ 2.5 GB        │</span></span>
<span class="line"><span>│  │  例：7B 模型，128K token 上下文 ≈ 80 GB！       │</span></span>
<span class="line"><span>│  └──────────────────────────┘                     │</span></span>
<span class="line"><span>│                                                    │</span></span>
<span class="line"><span>│  ┌──────────────────────────┐                     │</span></span>
<span class="line"><span>│  │  3. 激活值（Activations）                        │</span></span>
<span class="line"><span>│  │  前向传播中的中间计算结果                          │</span></span>
<span class="line"><span>│  │  相对较小，批量推理时累积                         │</span></span>
<span class="line"><span>│  └──────────────────────────┘                     │</span></span>
<span class="line"><span>│                                                    │</span></span>
<span class="line"><span>│  ┌──────────────────────────┐                     │</span></span>
<span class="line"><span>│  │  4. 框架开销（CUDA context 等）                  │</span></span>
<span class="line"><span>│  │  通常固定 0.5-2 GB                              │</span></span>
<span class="line"><span>│  └──────────────────────────┘                     │</span></span>
<span class="line"><span>│                                                    │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p><strong>量化：让大模型&quot;瘦身&quot;跑起来</strong></p><p>量化是将模型参数从高精度（FP16/BF16）转为低精度（INT8/INT4），大幅降低显存占用。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>量化精度对比：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>精度        每参数字节    7B 权重显存    70B 权重显存   质量影响</span></span>
<span class="line"><span>──────────────────────────────────────────────────────────</span></span>
<span class="line"><span>FP32         4 字节       28 GB         280 GB        基准（极少使用）</span></span>
<span class="line"><span>FP16/BF16    2 字节       14 GB         140 GB        几乎无损（标准用法）</span></span>
<span class="line"><span>INT8         1 字节       7 GB          70 GB         微小损失（0.1-0.3%）</span></span>
<span class="line"><span>INT4         0.5 字节     3.5 GB        35 GB         轻微损失（推理可接受）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="_2-推理引擎" tabindex="-1">2. 推理引擎 <a class="header-anchor" href="#_2-推理引擎" aria-label="Permalink to “2. 推理引擎”">​</a></h2><p>推理引擎是连接模型与硬件的软件层，它负责将模型的数学运算高效地映射到硬件上执行。选择什么推理引擎，直接影响服务的吞吐量、延迟和成本。</p><h3 id="_2-1-vllm-pagedattention-continuous-batching" tabindex="-1">2.1 vLLM（PagedAttention / Continuous Batching） <a class="header-anchor" href="#_2-1-vllm-pagedattention-continuous-batching" aria-label="Permalink to “2.1 vLLM（PagedAttention / Continuous Batching）”">​</a></h3><p>vLLM 是 UC Berkeley 开源的推理框架，目前是社区中最主流的 LLM 推理引擎之一。</p><div class="note custom-block github-alert"><p class="custom-block-title">核心创新：PagedAttention</p><p></p><p>PagedAttention 借鉴了操作系统中的<strong>虚拟内存分页</strong>思想，解决了 KV Cache 的内存管理问题。</p></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>传统 KV Cache 管理的问题：</span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  为每个请求预留连续的最大上下文窗口的显存      │</span></span>
<span class="line"><span>│                                              │</span></span>
<span class="line"><span>│  请求 A（32K max）: ████████████████████████  │</span></span>
<span class="line"><span>│  实际上只用了 2K:    ██░░░░░░░░░░░░░░░░░░░░░  │ ← 大量浪费</span></span>
<span class="line"><span>│                                              │</span></span>
<span class="line"><span>│  请求 B（32K max）: ████████████████████████  │</span></span>
<span class="line"><span>│  实际用了 30K:       ████████████████████░░░░  │</span></span>
<span class="line"><span>│                                              │</span></span>
<span class="line"><span>│  浪费的显存可高达 80%                           │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>PagedAttention 的解决方案：</span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  将 KV Cache 分成固定大小的&quot;页&quot;（Block）       │</span></span>
<span class="line"><span>│                                              │</span></span>
<span class="line"><span>│  物理显存：  ┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐  │</span></span>
<span class="line"><span>│            │A │B │A │A │C │B │B │A │C │C │  │ ← 按需分配</span></span>
<span class="line"><span>│            └──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘  │</span></span>
<span class="line"><span>│                                              │</span></span>
<span class="line"><span>│  请求 A 的 KV Cache 分布在第 1,3,4,8 页       │ ← 分散但高效</span></span>
<span class="line"><span>│  请求 B 的 KV Cache 分布在第 2,6,7 页         │</span></span>
<span class="line"><span>│  请求 C 的 KV Cache 分布在第 5,9,10 页        │</span></span>
<span class="line"><span>│                                              │</span></span>
<span class="line"><span>│  显存利用率从 20-40% 提升到接近 100%            │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p><strong>PagedAttention 带来的收益</strong></p><ul><li>显存利用率从 20-40% 提升到 90%+</li><li>支持更大的批量（batch size）——因为单个请求的显存&quot;押金&quot;降低了</li><li>吞吐量提升 2-4 倍（在同等硬件上）</li><li>使得更长的上下文窗口在推理部署中变得可行</li></ul><p><strong>Continuous Batching（连续批处理）</strong></p><p>详见第 4 节。vLLM 原生支持 Continuous Batching，在 PagedAttention 的基础上进一步提升了 GPU 利用率。</p><h3 id="_2-2-sglang-radixattention" tabindex="-1">2.2 SGLang（RadixAttention） <a class="header-anchor" href="#_2-2-sglang-radixattention" aria-label="Permalink to “2.2 SGLang（RadixAttention）”">​</a></h3><p>SGLang 是一个新兴的 LLM 推理和服务框架，由斯坦福等机构开发。</p><div class="note custom-block github-alert"><p class="custom-block-title">核心创新：RadixAttention</p><p></p><p>RadixAttention 是一种前缀感知的 KV Cache 复用技术。</p></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>RadixAttention 的核心洞察：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>多个用户的 prompt 通常有共同的前缀：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>用户 A：&quot;请翻译以下内容为法语：{长文本 A}&quot;</span></span>
<span class="line"><span>用户 B：&quot;请翻译以下内容为法语：{长文本 B}&quot;</span></span>
<span class="line"><span>用户 C：&quot;请总结以下内容：     {长文本 A}&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>三个请求共享前缀 &quot;请翻译以下内容为法语：&quot; 或 &quot;请&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>传统方式：为每个请求单独计算 + 存储 KV Cache</span></span>
<span class="line"><span>→ 前缀部分重复计算 + 重复存储</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RadixAttention：</span></span>
<span class="line"><span>用 Radix Tree（基数树）组织 KV Cache，自动检测和复用公共前缀</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span>│            Radix Tree 结构                     │</span></span>
<span class="line"><span>│                                                │</span></span>
<span class="line"><span>│           ┌── &quot;请翻译以下内容为法语：&quot;             │</span></span>
<span class="line"><span>│           │         │                           │</span></span>
<span class="line"><span>│     &quot;请&quot; ─┤         ├── {文本 A 的 KV}           │</span></span>
<span class="line"><span>│           │         └── {文本 B 的 KV}           │</span></span>
<span class="line"><span>│           │                                     │</span></span>
<span class="line"><span>│           └── &quot;请总结以下内容：&quot;                  │</span></span>
<span class="line"><span>│                     └── {文本 A 的 KV}           │</span></span>
<span class="line"><span>│                                                │</span></span>
<span class="line"><span>│  &quot;请&quot; 的 KV Cache 被三个请求共享，只计算一次        │</span></span>
<span class="line"><span>└─────────────────────────────────────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p><strong>RadixAttention 的适用场景</strong></p><ul><li>多轮对话（每轮的 system prompt 相同，前缀可复用）</li><li>Few-shot prompting（示例部分是相同的）</li><li>批量相似请求（如翻译服务的相同系统指令）</li><li>代理系统中的重复模板 prompt</li></ul><p><strong>SGLang 的其他特点</strong></p><ul><li>内置 Structured Generation（结构化输出：JSON / 正则约束）</li><li>支持前端语言 DSL，便于构建复杂推理 pipeline</li><li>与 vLLM 各有优势：vLLM 更成熟、社区更大；SGLang 在前缀复用和结构化生成上有独到之处</li></ul><h3 id="_2-3-tensorrt-llm" tabindex="-1">2.3 TensorRT-LLM <a class="header-anchor" href="#_2-3-tensorrt-llm" aria-label="Permalink to “2.3 TensorRT-LLM”">​</a></h3><p>TensorRT-LLM 是 NVIDIA 官方出品的 LLM 推理优化框架，将各种优化技术封装在一个工具包中。</p><p><strong>核心优化技术</strong></p><table tabindex="0"><thead><tr><th>技术</th><th>说明</th><th>收益</th></tr></thead><tbody><tr><td>Kernel Fusion</td><td>将多个小算子融合为一个大算子，减少显存读写</td><td>20-50% 加速</td></tr><tr><td>KV Cache 量化</td><td>将 KV Cache 从 FP16 量化为 INT8/FP8</td><td>减少 50-75% KV Cache 显存</td></tr><tr><td>In-flight Batching</td><td>NVIDIA 版本的 Continuous Batching</td><td>2-5x 吞吐提升</td></tr><tr><td>Multi-GPU Tensor Parallelism</td><td>内置的 TP 支持（详见 3 节）</td><td>大模型单卡放不下时的方案</td></tr><tr><td>FP8/INT4 推理</td><td>NVIDIA 新一代 GPU（H100+）原生支持的量化</td><td>显存减半，加速 2x</td></tr></tbody></table><p><strong>TensorRT-LLM 的优势与劣势</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>优势：</span></span>
<span class="line"><span>✓ NVIDIA 官方维护，硬件适配最好</span></span>
<span class="line"><span>✓ 在 NVIDIA GPU 上通常是性能天花板</span></span>
<span class="line"><span>✓ 企业级支持和文档</span></span>
<span class="line"><span></span></span>
<span class="line"><span>劣势：</span></span>
<span class="line"><span>✗ 仅支持 NVIDIA GPU</span></span>
<span class="line"><span>✗ 编译/部署流程比 vLLM 复杂</span></span>
<span class="line"><span>✗ 开源程度不如社区方案</span></span>
<span class="line"><span>✗ 模型支持需要手动 ONNX 转换</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>选择建议</strong></p><ul><li>如果追求极致的 NVIDIA GPU 推理性能 → TensorRT-LLM</li><li>如果追求灵活性和对多种硬件的支持 → vLLM</li><li>如果场景涉及大量前缀复用 → SGLang</li></ul><h3 id="_2-4-llama-cpp-cpu-推理" tabindex="-1">2.4 llama.cpp（CPU 推理） <a class="header-anchor" href="#_2-4-llama-cpp-cpu-推理" aria-label="Permalink to “2.4 llama.cpp（CPU 推理）”">​</a></h3><p>llama.cpp 是一个从头用 C/C++ 编写的 LLM 推理库，专注于在消费级硬件（甚至无 GPU）上运行大模型。</p><p><strong>核心特色：纯 CPU 推理 + 极致量化</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>llama.cpp 支持的量化格式：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>格式      每参数位宽    7B 模型大小    质量评估</span></span>
<span class="line"><span>─────────────────────────────────────────────</span></span>
<span class="line"><span>Q4_0      4.5 bit      4.0 GB        较好</span></span>
<span class="line"><span>Q4_K_M    4.5 bit      4.2 GB        更好（推荐）</span></span>
<span class="line"><span>Q5_K_M    5.5 bit      5.1 GB        好</span></span>
<span class="line"><span>Q6_K      6.5 bit      6.1 GB        非常好</span></span>
<span class="line"><span>Q8_0      8.5 bit      7.7 GB        几乎无损</span></span>
<span class="line"><span>F16       16 bit       13.5 GB       无损</span></span>
<span class="line"><span></span></span>
<span class="line"><span>GGUF 格式：llama.cpp 使用的模型文件格式</span></span>
<span class="line"><span>         将模型权重 + 配置 + tokenizer 打包为一个文件</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>Apple Silicon 上的特殊优化</strong></p><p>llama.cpp 在 Apple Silicon（M1/M2/M3/M4）上利用 Metal API 进行 GPU 加速，8B 模型在 MacBook Pro（M3 Max）上可达到 30-50 tokens/s，这对于本地推理来说已经非常可用。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>MacBook 上的运行体验（llama.cpp + Q4_K_M 量化）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>MacBook Pro M3 Max (36GB RAM)</span></span>
<span class="line"><span>├── Llama 3.1 8B： ~35 tokens/s   ← 流畅可用</span></span>
<span class="line"><span>├── Qwen 2.5 14B： ~18 tokens/s   ← 可用</span></span>
<span class="line"><span>└── Qwen 2.5 32B： ~8 tokens/s    ← 勉强可用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>MacBook Air M2 (8GB RAM)</span></span>
<span class="line"><span>├── Llama 3.2 3B： ~25 tokens/s   ← 流畅</span></span>
<span class="line"><span>├── Qwen 2.5 7B： ~10 tokens/s    ← 可用但慢</span></span>
<span class="line"><span>└── 更大模型：                     ← 内存不够会疯狂 swap</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>使用场景</strong></p><ul><li>本地隐私敏感场景（数据不出本地）</li><li>开发调试（快速测试模型行为，不需要启动远程服务器）</li><li>低成本边缘部署</li><li>对延迟不敏感的离线批处理</li></ul><h3 id="_2-5-ollama-本地部署工具" tabindex="-1">2.5 Ollama（本地部署工具） <a class="header-anchor" href="#_2-5-ollama-本地部署工具" aria-label="Permalink to “2.5 Ollama（本地部署工具）”">​</a></h3><p>Ollama 是基于 llama.cpp 的上层封装，让本地部署大模型变得像 <code>ollama run llama3</code> 一样简单。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Ollama 做对了什么：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>安装体验：</span></span>
<span class="line"><span>$ curl -fsSL https://ollama.com/install.sh | sh</span></span>
<span class="line"><span>  （一行命令安装）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>使用体验：</span></span>
<span class="line"><span>$ ollama run llama3.2</span></span>
<span class="line"><span>  &gt;&gt;&gt; 你好，请用中文介绍你自己</span></span>
<span class="line"><span>  （直接开始对话）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>API 体验：</span></span>
<span class="line"><span>$ ollama serve  # 启动本地 API 服务器</span></span>
<span class="line"><span>$ curl http://localhost:11434/api/generate -d &#39;{</span></span>
<span class="line"><span>    &quot;model&quot;: &quot;llama3.2&quot;,</span></span>
<span class="line"><span>    &quot;prompt&quot;: &quot;你好&quot;</span></span>
<span class="line"><span>  }&#39;</span></span>
<span class="line"><span>  （兼容 OpenAI API 格式）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>模型管理：</span></span>
<span class="line"><span>$ ollama pull qwen2.5:7b    # 下载模型</span></span>
<span class="line"><span>$ ollama list                # 列出本地模型</span></span>
<span class="line"><span>$ ollama rm qwen2.5:7b       # 删除模型</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p><strong>Ollama 的模型定制（Modelfile）</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span># Modelfile 示例</span></span>
<span class="line"><span>FROM qwen2.5:7b</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置系统提示</span></span>
<span class="line"><span>SYSTEM &quot;你是一位精通中文的 AI 助手，回答简洁明了。&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置参数</span></span>
<span class="line"><span>PARAMETER temperature 0.7</span></span>
<span class="line"><span>PARAMETER top_p 0.9</span></span>
<span class="line"><span>PARAMETER num_ctx 8192</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 自定义停止词</span></span>
<span class="line"><span>PARAMETER stop &quot;&lt;|im_end|&gt;&quot;</span></span>
<span class="line"><span>PARAMETER stop &quot;&lt;/s&gt;&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>推理引擎对比总结</strong></p><table tabindex="0"><thead><tr><th>引擎</th><th>硬件要求</th><th>性能</th><th>易用性</th><th>最佳场景</th></tr></thead><tbody><tr><td>vLLM</td><td>NVIDIA GPU</td><td>高</td><td>中</td><td>云端服务、高并发</td></tr><tr><td>SGLang</td><td>NVIDIA GPU</td><td>高</td><td>中</td><td>前缀复用、结构化输出</td></tr><tr><td>TensorRT-LLM</td><td>NVIDIA GPU</td><td>最高</td><td>低</td><td>极致性能追求</td></tr><tr><td>llama.cpp</td><td>CPU / Apple Silicon / 多种</td><td>中</td><td>中</td><td>本地、隐私、低成本</td></tr><tr><td>Ollama</td><td>同上（封装 llama.cpp）</td><td>中</td><td>最高</td><td>个人使用、快速体验</td></tr></tbody></table><h2 id="_3-并行策略" tabindex="-1">3. 并行策略 <a class="header-anchor" href="#_3-并行策略" aria-label="Permalink to “3. 并行策略”">​</a></h2><p>当单张 GPU 装不下整个模型时（70B 模型在 FP16 需要约 140 GB 显存，单张 H100 只有 80 GB），就需要将模型拆分到多张 GPU 上。这就是并行策略解决的问题。</p><h3 id="_3-1-四种并行策略一览" tabindex="-1">3.1 四种并行策略一览 <a class="header-anchor" href="#_3-1-四种并行策略一览" aria-label="Permalink to “3.1 四种并行策略一览”">​</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                       并行策略族                               │</span></span>
<span class="line"><span>├───────────────┬───────────────┬───────────────┬──────────────┤</span></span>
<span class="line"><span>│  数据并行(DP)  │  张量并行(TP)  │  流水线并行(PP) │ 专家并行(EP)  │</span></span>
<span class="line"><span>│  分数据        │  分算子        │  分层           │  分专家        │</span></span>
<span class="line"><span>├───────────────┼───────────────┼───────────────┼──────────────┤</span></span>
<span class="line"><span>│ 每个 GPU 有   │ 矩阵乘法被    │ 前几层在      │ MoE 模型中    │</span></span>
<span class="line"><span>│ 完整模型副本   │ 切分到多个    │ GPU0，中几层   │ 不同专家分布   │</span></span>
<span class="line"><span>│               │ GPU          │ 在 GPU1...     │ 在不同 GPU    │</span></span>
<span class="line"><span>├───────────────┼───────────────┼───────────────┼──────────────┤</span></span>
<span class="line"><span>│ 通信量低       │ 通信量极高    │ 通信量中       │ 通信量中      │</span></span>
<span class="line"><span>│ 扩展性好       │ 仅限单机内    │ 跨机可扩展     │ MoE 专属      │</span></span>
<span class="line"><span>└───────────────┴───────────────┴───────────────┴──────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="_3-2-tensor-parallelism-张量并行" tabindex="-1">3.2 Tensor Parallelism（张量并行） <a class="header-anchor" href="#_3-2-tensor-parallelism-张量并行" aria-label="Permalink to “3.2 Tensor Parallelism（张量并行）”">​</a></h3><p>把单个矩阵乘法运算拆分到多个 GPU 上并行计算。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>张量并行（TP=2 为例）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>原始矩阵乘法（单 GPU）：</span></span>
<span class="line"><span>    X          W           Y</span></span>
<span class="line"><span>  ┌────┐   ┌────────┐   ┌────┐</span></span>
<span class="line"><span>  │    │ × │        │ = │    │</span></span>
<span class="line"><span>  │ d  │   │ d × d  │   │ d  │</span></span>
<span class="line"><span>  │    │   │        │   │    │</span></span>
<span class="line"><span>  └────┘   └────────┘   └────┘</span></span>
<span class="line"><span>  GPU 0 承担全部计算</span></span>
<span class="line"><span></span></span>
<span class="line"><span>TP=2 按列切分：</span></span>
<span class="line"><span>    X          W₁          W₂</span></span>
<span class="line"><span>  ┌────┐   ┌────┐   ┌────┐</span></span>
<span class="line"><span>  │    │ × │d×d/2│   │d×d/2│</span></span>
<span class="line"><span>  │ d  │   └────┘   └────┘</span></span>
<span class="line"><span>  │    │    GPU 0    GPU 1      ← 每个 GPU 只算一半列</span></span>
<span class="line"><span>  └────┘      │         │</span></span>
<span class="line"><span>              ▼         ▼</span></span>
<span class="line"><span>          ┌────┐    ┌────┐</span></span>
<span class="line"><span>          │d/2 │    │d/2 │      ← 部分结果</span></span>
<span class="line"><span>          └────┘    └────┘</span></span>
<span class="line"><span>              │         │</span></span>
<span class="line"><span>              └────┬────┘</span></span>
<span class="line"><span>                   ▼</span></span>
<span class="line"><span>              ┌────────┐</span></span>
<span class="line"><span>              │   d    │         ← All-Reduce 合并结果</span></span>
<span class="line"><span>              └────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>通信模式：All-Reduce，每次矩阵乘法后都需要同步 → 通信量极高</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p><strong>TP 的关键特征</strong></p><ul><li>切分的是<strong>计算</strong>（矩阵乘法本身），而不是数据或层</li><li>每次前向传播涉及多次 All-Reduce 通信 → 需要极高带宽的互联（NVLink/NVSwitch）</li><li><strong>适合单机多卡</strong>（同一台机器内的 GPU 通过 NVLink 互联，带宽可达 900 GB/s）</li><li><strong>不适合跨机</strong>（网络带宽通常只有 100-400 Gbps，远不如 NVLink）</li></ul><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>TP 的适用范围：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>TP=2：常用，两张 H100 可推理 140GB 的 70B 模型</span></span>
<span class="line"><span>TP=4：可推理更大的模型，但通信开销显著增加</span></span>
<span class="line"><span>TP=8：单机 8 卡的极限，通信开销极其显著</span></span>
<span class="line"><span></span></span>
<span class="line"><span>一般不建议 TP &gt; 8，效率折损严重</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="_3-3-pipeline-parallelism-流水线并行" tabindex="-1">3.3 Pipeline Parallelism（流水线并行） <a class="header-anchor" href="#_3-3-pipeline-parallelism-流水线并行" aria-label="Permalink to “3.3 Pipeline Parallelism（流水线并行）”">​</a></h3><p>把模型的不同层分给不同 GPU，数据像流水线一样依次流过。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>流水线并行（PP=4）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>时间 →</span></span>
<span class="line"><span>───────────────────────────────────────────────→</span></span>
<span class="line"><span>GPU 0: [Batch 1]         [Batch 2]         [Batch 3]</span></span>
<span class="line"><span>       层 1-8             层 1-8             层 1-8</span></span>
<span class="line"><span>           │                  │                  │</span></span>
<span class="line"><span>GPU 1:     [Batch 1]         [Batch 2]         [Batch 3]</span></span>
<span class="line"><span>           层 9-16            层 9-16            层 9-16</span></span>
<span class="line"><span>              │                  │                  │</span></span>
<span class="line"><span>GPU 2:        [Batch 1]         [Batch 2]         [Batch 3]</span></span>
<span class="line"><span>              层 17-24           层 17-24           层 17-24</span></span>
<span class="line"><span>                 │                  │                  │</span></span>
<span class="line"><span>GPU 3:           [Batch 1]         [Batch 2]         [Batch 3]</span></span>
<span class="line"><span>                 层 25-32           层 25-32           层 25-32</span></span>
<span class="line"><span></span></span>
<span class="line"><span>GPU 利用率问题：</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── 初始阶段：GPU 0 忙，GPU 1-3 空闲              ← &quot;冷启动&quot;</span></span>
<span class="line"><span>├── 稳定阶段：4 个 GPU 都在忙                      ← 理想状态</span></span>
<span class="line"><span>├── 结束阶段：GPU 3 忙，GPU 0-2 空闲              ← &quot;排空&quot;</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>└── 有 bubble（气泡）：GPU 空闲等待的时间占比</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p><strong>PP 的关键特征</strong></p><ul><li>切分的是<strong>层</strong>（layer-wise）</li><li>通信量相对低：只需在层边界传输激活值（大小 = batch_size × hidden_dim）</li><li><strong>适合跨机扩展</strong>：即使网络带宽低，也能正常运作</li><li><strong>Bubble 问题</strong>：流水线有空闲期，可通过 Micro-Batching 缓解</li></ul><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>Micro-Batching 缓解 Bubble：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>将一个大 Batch 拆分成多个 Micro-Batch：</span></span>
<span class="line"><span>Batch = [M1, M2, M3, M4]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>GPU 0: [M1] [M2] [M3] [M4]</span></span>
<span class="line"><span>GPU 1: 空闲  [M1] [M2] [M3] [M4]</span></span>
<span class="line"><span>GPU 2: 空闲  空闲  [M1] [M2] [M3] [M4]</span></span>
<span class="line"><span>GPU 3: 空闲  空闲  空闲  [M1] [M2] [M3] [M4]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>微批次越多，bubble 占比越小（但通信次数增多）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="_3-4-data-parallelism-数据并行" tabindex="-1">3.4 Data Parallelism（数据并行） <a class="header-anchor" href="#_3-4-data-parallelism-数据并行" aria-label="Permalink to “3.4 Data Parallelism（数据并行）”">​</a></h3><p>每个 GPU 拥有一份完整的模型副本，处理不同的输入数据。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>数据并行（DP=4）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     输入 Batch = [样本1, 样本2, 样本3, 样本4, 样本5, 样本6, 样本7, 样本8]</span></span>
<span class="line"><span>                    │</span></span>
<span class="line"><span>     ┌──────────────┼──────────────┬──────────────┐</span></span>
<span class="line"><span>     ▼              ▼              ▼              ▼</span></span>
<span class="line"><span>  GPU 0          GPU 1          GPU 2          GPU 3</span></span>
<span class="line"><span>  [1,2]         [3,4]          [5,6]          [7,8]</span></span>
<span class="line"><span>     │              │              │              │</span></span>
<span class="line"><span>  前向传播        前向传播        前向传播        前向传播</span></span>
<span class="line"><span>     │              │              │              │</span></span>
<span class="line"><span>  本地梯度        本地梯度        本地梯度        本地梯度</span></span>
<span class="line"><span>     │              │              │              │</span></span>
<span class="line"><span>     └──────────────┴──────┬───────┴──────────────┘</span></span>
<span class="line"><span>                           │</span></span>
<span class="line"><span>                    All-Reduce 平均梯度</span></span>
<span class="line"><span>                           │</span></span>
<span class="line"><span>              ┌────────────┼────────────┐</span></span>
<span class="line"><span>              ▼            ▼            ▼</span></span>
<span class="line"><span>           GPU 0        GPU 1        GPU 3  ← 所有 GPU 更新为相同参数</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p><strong>DP 的关键特征</strong></p><ul><li>适用于<strong>训练</strong>，推理时通常不需要</li><li>要求每个 GPU 能装下完整模型 → 对大模型不实用</li><li>对于推理场景，如果不做模型切分，DP 意味着每个 GPU 复制一份模型 → 各 GPU 独立服务不同请求</li></ul><h3 id="_3-5-expert-parallelism-专家并行-moe-专用" tabindex="-1">3.5 Expert Parallelism（专家并行，MoE 专用） <a class="header-anchor" href="#_3-5-expert-parallelism-专家并行-moe-专用" aria-label="Permalink to “3.5 Expert Parallelism（专家并行，MoE 专用）”">​</a></h3><p>MoE（Mixture of Experts）模型中有多个&quot;专家&quot;子网络，每次只激活其中一部分。EP 将不同的专家分布到不同的 GPU 上。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>专家并行（EP=4，8 个专家为例）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>GPU 0: Expert 0, Expert 1</span></span>
<span class="line"><span>GPU 1: Expert 2, Expert 3</span></span>
<span class="line"><span>GPU 2: Expert 4, Expert 5</span></span>
<span class="line"><span>GPU 3: Expert 6, Expert 7</span></span>
<span class="line"><span></span></span>
<span class="line"><span>一次前向传播：</span></span>
<span class="line"><span>┌──────────────────────────────────────────────┐</span></span>
<span class="line"><span>│ Token ──→ Router（门控网络）                   │</span></span>
<span class="line"><span>│              │                                 │</span></span>
<span class="line"><span>│     &quot;这个 token 应该去 Expert 2 和 Expert 5&quot;    │</span></span>
<span class="line"><span>│              │                                 │</span></span>
<span class="line"><span>│     ┌────────┼────────┐                        │</span></span>
<span class="line"><span>│     ▼        │        ▼                        │</span></span>
<span class="line"><span>│  GPU 1       │     GPU 2                       │</span></span>
<span class="line"><span>│  Expert 2    │     Expert 5                    │</span></span>
<span class="line"><span>│     │        │        │                        │</span></span>
<span class="line"><span>│     └────────┼────────┘                        │</span></span>
<span class="line"><span>│              ▼                                 │</span></span>
<span class="line"><span>│         加权合并输出（All-to-All 通信）           │</span></span>
<span class="line"><span>└──────────────────────────────────────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p><strong>EP 的通信模式</strong></p><ul><li><strong>All-to-All 通信</strong>：每个 GPU 可能需要向其他所有 GPU 发送/接收 token</li><li>通信量取决于 MoE 的 top-k 设置（通常 k=2，每个 token 去 2 个专家）</li><li>是 MoE 架构的核心优化方向</li></ul><h3 id="_3-6-混合并行-3d-parallelism" tabindex="-1">3.6 混合并行（3D Parallelism） <a class="header-anchor" href="#_3-6-混合并行-3d-parallelism" aria-label="Permalink to “3.6 混合并行（3D Parallelism）”">​</a></h3><p>在实际生产部署中，常常组合使用多种并行策略。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>3D 并行示例：部署一个 70B 模型在 8 个节点、每节点 8 张 GPU 上</span></span>
<span class="line"><span></span></span>
<span class="line"><span>PP=8（8 级流水线，每级在 1 个节点上）</span></span>
<span class="line"><span>   ├── 节点 0：层 1-10</span></span>
<span class="line"><span>   ├── 节点 1：层 11-20</span></span>
<span class="line"><span>   ├── ...</span></span>
<span class="line"><span>   └── 节点 7：层 71-80</span></span>
<span class="line"><span></span></span>
<span class="line"><span>每节点内部 TP=4（4 张 GPU 做张量并行）</span></span>
<span class="line"><span>   ├── GPU 0,1,2,3 切分相同层的权重</span></span>
<span class="line"><span></span></span>
<span class="line"><span>DP=2（2 份数据拷贝）</span></span>
<span class="line"><span>   ├── 可用于提高吞吐</span></span>
<span class="line"><span></span></span>
<span class="line"><span>综合：8 节点 × 8 GPU = 64 GPU</span></span>
<span class="line"><span>      交叉通信复杂但高效</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="_4-continuous-batching-连续批处理" tabindex="-1">4. Continuous Batching（连续批处理） <a class="header-anchor" href="#_4-continuous-batching-连续批处理" aria-label="Permalink to “4. Continuous Batching（连续批处理）”">​</a></h2><p>Continuous Batching 是大模型推理服务性能优化的关键技术，直接决定了服务能同时处理多少用户、每个用户的响应有多快。</p><h3 id="_4-1-传统批处理-vs-连续批处理" tabindex="-1">4.1 传统批处理 vs 连续批处理 <a class="header-anchor" href="#_4-1-传统批处理-vs-连续批处理" aria-label="Permalink to “4.1 传统批处理 vs 连续批处理”">​</a></h3><p><strong>传统（Static）Batching 的问题</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>传统批处理：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>时间 →</span></span>
<span class="line"><span>──────────────────────────────────→</span></span>
<span class="line"><span>请求到达时间：</span></span>
<span class="line"><span>A 先到 ────────────────────────────────</span></span>
<span class="line"><span>      B 后到 ──────────────────────────</span></span>
<span class="line"><span>               C 最后到 ────────────────</span></span>
<span class="line"><span></span></span>
<span class="line"><span>传统批处理的工作方式：</span></span>
<span class="line"><span>[等一批满] → [开始推理] → [等待全部完成] → [返回结果]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>批次 1: [A, B, C]      ← A 必须等 C 到了才开始</span></span>
<span class="line"><span>        ████████████</span></span>
<span class="line"><span>        推理完成，但 A 等了很久</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果 C 生成长度是 A 的 5 倍：</span></span>
<span class="line"><span>批次 1: [A██████░░░░░░░░░░░░░░░░░░]</span></span>
<span class="line"><span>         ████████████████████████████</span></span>
<span class="line"><span>         完成              等待         → A 已经完成了，但 GPU 还在</span></span>
<span class="line"><span>                                         为 B 和 C 工作，A 的结果却</span></span>
<span class="line"><span>                                         不能提前返回！</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p><strong>Continuous Batching 如何工作</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>连续批处理：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>时间 →</span></span>
<span class="line"><span>──────────────────────────────────────→</span></span>
<span class="line"><span>请求到达即可加入，完成后立即退出</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[等待队列:]  [推理中:]  [已完成:]  [返回:]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>时刻 1: A 到达 → [A 开始推理]</span></span>
<span class="line"><span>时刻 2: B 到达 → [A ████░░░░] 完成 A → 返回给用户，B 继续</span></span>
<span class="line"><span>                                    → A 不用等待 B！</span></span>
<span class="line"><span>时刻 3: C 到达 → [B █████████████] B 完成 → 返回给用户</span></span>
<span class="line"><span>                                    → 加入 C 开始推理</span></span>
<span class="line"><span>时刻 4:       → [C ████████] C 完成 → 返回给用户</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>直观对比</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>场景：3 个请求，生成长度分别为 10, 50, 30 tokens</span></span>
<span class="line"><span></span></span>
<span class="line"><span>静态批处理（batch_size=3）：</span></span>
<span class="line"><span>────────────────────────────────────────</span></span>
<span class="line"><span>│A│B                                      │</span></span>
<span class="line"><span>│ │████████████████████████████████████████│ → 总耗时 = 50 tokens 的时间</span></span>
<span class="line"><span>│ │C                                      │    A 在 10 tokens 处完成，</span></span>
<span class="line"><span>└─┴──────────────────────────────────────┘    但结果要到 50 才返回</span></span>
<span class="line"><span>                                              等待时间 = 40 tokens</span></span>
<span class="line"><span></span></span>
<span class="line"><span>连续批处理（evolving batch）：</span></span>
<span class="line"><span>────────────────────────────────────────</span></span>
<span class="line"><span>│A│  A 完成立即返回</span></span>
<span class="line"><span>│ │B─────────────────────────</span></span>
<span class="line"><span>│ │  │C─────────────────</span></span>
<span class="line"><span>│ │  │  │新请求D───</span></span>
<span class="line"><span>└─┴──┴──┴──────────────────────────────</span></span>
<span class="line"><span>   A 10 tokens 完成 → 立即返回</span></span>
<span class="line"><span>   C 30 tokens 完成 → 立即返回</span></span>
<span class="line"><span>   B 50 tokens 完成 → 返回</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>延迟改善：A 的响应延迟减少约 70%</span></span>
<span class="line"><span>GPU 利用率始终接近 100% → 吞吐提升 2-5 倍</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="_4-2-动态请求调度" tabindex="-1">4.2 动态请求调度 <a class="header-anchor" href="#_4-2-动态请求调度" aria-label="Permalink to “4.2 动态请求调度”">​</a></h3><p>Continuous Batching 的核心是<strong>调度器</strong>——它决定了每时每刻哪些请求在 GPU 上执行。</p><p><strong>调度器的工作循环</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>while True:</span></span>
<span class="line"><span>    1. 接收新的推理请求，放入等待队列</span></span>
<span class="line"><span>    2. 检查当前正在推理的请求是否已完成</span></span>
<span class="line"><span>       → 完成的移出，返回结果给用户</span></span>
<span class="line"><span>    3. 检查显存是否还有空间</span></span>
<span class="line"><span>       → 有空间就从等待队列中取出请求，开始推理</span></span>
<span class="line"><span>    4. 对当前活跃请求执行一个 step（生成一个 token）</span></span>
<span class="line"><span>    5. 回到步骤 1</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>调度策略对比</strong></p><table tabindex="0"><thead><tr><th>策略</th><th>规则</th><th>适用场景</th><th>优劣</th></tr></thead><tbody><tr><td>FCFS（先到先服务）</td><td>最简单的轮询</td><td>通用</td><td>公平但非最优</td></tr><tr><td>Priority-based</td><td>按优先级队列</td><td>付费分层 / VIP</td><td>可商业化，但可能饿死低优</td></tr><tr><td>Shortest-first</td><td>预测生成长度，优先短请求</td><td>延迟敏感</td><td>短请求响应极快，长请求可能饿死</td></tr><tr><td>Fairness-aware</td><td>混合策略，确保不饿死</td><td>通用服务</td><td>最推荐，平衡性好</td></tr></tbody></table><p><strong>调度中的核心挑战：Preemption（抢占）</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>场景：一个请求生成了 5000 tokens 还没停，新来了 100 个短请求</span></span>
<span class="line"><span>问题：长请求占着 GPU，短请求全部在排队</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解决方案 —— Preemption（抢占）：</span></span>
<span class="line"><span>1. 将长请求的 KV Cache 保存到 CPU 显存或内存</span></span>
<span class="line"><span>2. 暂停长请求</span></span>
<span class="line"><span>3. 处理短请求</span></span>
<span class="line"><span>4. 短请求处理完毕后，加载长请求的 KV Cache 恢复执行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这就像操作系统的进程切换——只是&quot;上下文&quot;</span></span>
<span class="line"><span>变成了 KV Cache（可能几 GB 到几十 GB）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="_4-3-gpu-利用率最大化" tabindex="-1">4.3 GPU 利用率最大化 <a class="header-anchor" href="#_4-3-gpu-利用率最大化" aria-label="Permalink to “4.3 GPU 利用率最大化”">​</a></h3><p><strong>GPU 利用率是推理部署的核心经济指标</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>按小时付费的 GPU 实例：A100 约 $1-2/小时/卡，H100 约 $2-4/小时/卡</span></span>
<span class="line"><span></span></span>
<span class="line"><span>GPU 利用率 30% → 70% 的钱在烧空气</span></span>
<span class="line"><span>GPU 利用率 90% → 几乎每一分钱都在产生价值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>年度成本差异（单卡）：</span></span>
<span class="line"><span>30% 利用率：$17,520/年 中只有 $5,256 在真正工作</span></span>
<span class="line"><span>90% 利用率：$17,520/年 中有 $15,768 在真正工作</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>达到高 GPU 利用率的策略</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>策略 1：增大并发数</span></span>
<span class="line"><span>─────────────────</span></span>
<span class="line"><span>增加同时在 GPU 上运行的请求数量。</span></span>
<span class="line"><span>需要 PagedAttention 来高效管理显存。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>策略 2：混合长短请求</span></span>
<span class="line"><span>─────────────────</span></span>
<span class="line"><span>长请求（摘要、翻译长文档）→ 保证 GPU 始终有事做</span></span>
<span class="line"><span>短请求（对话、问答）      → 在长请求间隙快速处理</span></span>
<span class="line"><span></span></span>
<span class="line"><span>就像餐厅：大桌慢菜 + 小桌快菜，厨房永远不空</span></span>
<span class="line"><span></span></span>
<span class="line"><span>策略 3：Batching 相关的 CUDA Kernel 优化</span></span>
<span class="line"><span>─────────────────</span></span>
<span class="line"><span>现代推理引擎（vLLM / TensorRT-LLM）将多个请求</span></span>
<span class="line"><span>的矩阵乘法融合为一个大的 GEMM 操作：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>传统：Request 1 × W, Request 2 × W, Request 3 × W</span></span>
<span class="line"><span>      → 3 次小矩阵乘法，GPU 算不满</span></span>
<span class="line"><span></span></span>
<span class="line"><span>优化：Concat([R1, R2, R3]) × W</span></span>
<span class="line"><span>      → 1 次大矩阵乘法，GPU 满载</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这个过程叫&quot;packing&quot;或&quot;kernel fusion&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p><strong>实际吞吐量数据参考（单张 A100-80GB，Llama 2 7B）</strong></p><table tabindex="0"><thead><tr><th>配置</th><th>吞吐量 (tokens/s)</th><th>平均延迟 (s)</th><th>GPU 利用率</th></tr></thead><tbody><tr><td>静态批处理 batch=1</td><td>~50</td><td>~0.02</td><td>~30%</td></tr><tr><td>静态批处理 batch=8</td><td>~200</td><td>~0.04</td><td>~60%</td></tr><tr><td>Continuous Batching</td><td>~400</td><td>~0.03</td><td>~91%</td></tr><tr><td>Continuous Batching + FP8 量化</td><td>~700</td><td>~0.02</td><td>~93%</td></tr></tbody></table><p><strong>延迟 vs 吞吐量的权衡</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>这是部署中最经典的权衡。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>吞吐优先配置（高 batch size）：</span></span>
<span class="line"><span>→ 同时处理很多请求，GPU 利用率高</span></span>
<span class="line"><span>→ 但每个请求的延迟增加（GPU 被分摊）</span></span>
<span class="line"><span>→ 适合：批量数据处理、离线评估</span></span>
<span class="line"><span></span></span>
<span class="line"><span>延迟优先配置（低 batch size）：</span></span>
<span class="line"><span>→ 只同时处理少量请求，GPU 利用率低</span></span>
<span class="line"><span>→ 但每个请求响应很快</span></span>
<span class="line"><span>→ 适合：实时对话、交互式应用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>推荐策略：SLA 驱动的自适应调度</span></span>
<span class="line"><span>→ 设定延迟目标（如 p95 &lt; 500ms）</span></span>
<span class="line"><span>→ 在不超出延迟预算的前提下，尽可能增大 batch</span></span>
<span class="line"><span>→ 动态调整</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><strong>成本实战参考：部署一个 7B 模型到生产环境</strong></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>场景：为 1000 个日活用户提供对话服务</span></span>
<span class="line"><span></span></span>
<span class="line"><span>估算公式：</span></span>
<span class="line"><span>- 平均每个请求：输入 500 tokens + 输出 200 tokens</span></span>
<span class="line"><span>- 峰值 QPS：20 请求/秒（按日活 2% 的同时在线估算）</span></span>
<span class="line"><span>- 单卡 A100-80GB 约能支撑：15-25 QPS（Llama 7B + vLLM + Continuous Batching）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>硬件配置：</span></span>
<span class="line"><span>方案 A：2x A100-80GB（一主一备） → 每月成本约 $1,500-3,000（云端）</span></span>
<span class="line"><span>方案 B：单卡 A100-80GB + 限流     → 每月成本约 $1,000-2,000（需容忍偶尔排队）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>对于 70B 模型：</span></span>
<span class="line"><span>- 需要 2-4 张 A100/H100</span></span>
<span class="line"><span>- 云端月成本约 $5,000-15,000</span></span>
<span class="line"><span>- 推荐使用模型量化（INT4）来降低到 2 卡可运行</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="_5-结束语" tabindex="-1">5. 结束语 <a class="header-anchor" href="#_5-结束语" aria-label="Permalink to “5. 结束语”">​</a></h2><p>大模型推理部署是一个涉及&quot;硬件选型 × 推理引擎 × 并行策略 × 批处理优化&quot;的综合性工程问题。不存在放之四海而皆准的最优配置——最佳方案始终取决于具体的模型规模、流量特征、延迟约束与成本预算。</p><p>核心优化思路在于：<strong>借助 PagedAttention 等显存管理技术提升单卡利用率，通过 Continuous Batching 最大化吞吐能力，并在必要时引入并行策略实现水平扩展</strong>。值得注意的是，这一领域的技术实践正在快速迭代演进，建议持续关注 vLLM、SGLang 等主流开源项目的最新进展。</p>`,127)])]))}});export{b as __pageData,u as default};
