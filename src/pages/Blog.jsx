import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, ArrowRight, TrendingUp, BookOpen, Sparkles, Tag, Eye, User, Mail, X } from 'lucide-react'
import { useState } from 'react'

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPost, setSelectedPost] = useState(null)

  const blogPosts = [
    {
      title: 'The Future of AI in Electronic Testing',
      description: 'Discover how artificial intelligence is revolutionizing the way we approach electronic product testing and certification, making processes faster and more accurate than ever before.',
      date: 'March 15, 2024',
      readTime: '5 min read',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
      author: 'Aditya Kumar Sahu',
      views: '2.5K',
      featured: true,
      content: `Artificial intelligence is transforming the landscape of electronic product testing and certification in unprecedented ways. As we move further into the digital age, AI-powered solutions are becoming essential tools for ensuring product quality, compliance, and market readiness.

**The Current State of AI in Testing**

Traditional testing methods, while reliable, often require extensive manual intervention and can be time-consuming. AI is changing this by introducing automated test generation, intelligent defect detection, and predictive analytics that can identify potential issues before they become critical problems.

**Key Benefits of AI-Powered Testing**

1. **Speed and Efficiency**: AI algorithms can process thousands of test cases in minutes, significantly reducing the time required for comprehensive product validation.

2. **Accuracy and Consistency**: Machine learning models eliminate human error and ensure consistent testing standards across all products.

3. **Predictive Analysis**: AI can predict potential failures and suggest optimizations before physical testing begins, saving both time and resources.

4. **Cost Reduction**: By automating repetitive tasks and catching issues early, AI reduces overall testing costs while improving quality.

**Real-World Applications**

Leading companies are already leveraging AI for:
- Automated test case generation based on product specifications
- Intelligent anomaly detection in test results
- Predictive maintenance of testing equipment
- Natural language processing for requirement analysis
- Computer vision for automated visual inspections

**The Future Outlook**

As AI technology continues to evolve, we can expect even more sophisticated applications, including:
- Fully autonomous testing laboratories
- Real-time adaptive testing protocols
- Advanced simulation models that eliminate the need for physical prototypes
- Integration with IoT devices for continuous monitoring

The future of electronic testing is undoubtedly AI-driven, and companies that embrace these technologies now will have a significant competitive advantage in the marketplace.`
    },
    {
      title: 'Best Practices for Product Simulation',
      description: 'Learn the essential techniques for effective product simulation that can save time and reduce development costs while ensuring optimal performance and reliability.',
      date: 'March 10, 2024',
      readTime: '7 min read',
      category: 'Best Practices',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      author: 'Michael Torres',
      views: '3.1K',
      featured: false,
      content: `Product simulation has become an indispensable tool in modern product development, allowing engineers to test and optimize designs before physical prototyping. Here are the essential best practices for effective product simulation.

**1. Start with Clear Objectives**

Before beginning any simulation, clearly define what you want to achieve. Are you testing thermal performance, structural integrity, electromagnetic compatibility, or something else? Having clear objectives helps you choose the right simulation tools and parameters.

**2. Validate Your Models**

Always validate simulation results against known data or physical tests. This ensures your models accurately represent real-world behavior. Start with simple cases and gradually increase complexity.

**3. Use Appropriate Mesh Quality**

The quality of your simulation mesh directly impacts accuracy. Invest time in creating a well-structured mesh that balances computational efficiency with result accuracy. Use finer meshes in critical areas and coarser meshes where less detail is needed.

**4. Consider Multiple Scenarios**

Don't limit yourself to a single operating condition. Test your product under various scenarios including:
- Different environmental conditions
- Various load cases
- Edge cases and failure modes
- Long-term performance predictions

**5. Iterate and Optimize**

Simulation is an iterative process. Use results to refine your design, then re-simulate. This cycle of design-simulate-optimize can significantly improve product performance while reducing development time.

**6. Document Everything**

Maintain detailed documentation of your simulation setup, assumptions, and results. This is crucial for:
- Reproducing results
- Meeting compliance requirements
- Training team members
- Future reference

**7. Leverage Cloud Computing**

Modern simulation often requires significant computational resources. Cloud-based simulation platforms offer scalable computing power without the need for expensive local infrastructure.

**8. Integrate with Physical Testing**

Simulation and physical testing should complement each other. Use simulation to guide physical testing, and use physical test results to validate and improve your simulation models.

**Common Pitfalls to Avoid**

- Over-simplifying complex systems
- Ignoring manufacturing tolerances
- Not considering environmental factors
- Relying solely on simulation without validation
- Using outdated or inappropriate material properties

By following these best practices, you can maximize the value of product simulation in your development process, reducing costs and time-to-market while improving product quality.`
    },
    {
      title: 'Navigating Certification Requirements',
      description: 'A comprehensive guide to understanding and meeting the latest industry certification standards and requirements for electronic products in today\'s market.',
      date: 'March 5, 2024',
      readTime: '6 min read',
      category: 'Guide',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
      author: 'Emily Johnson',
      views: '1.8K',
      featured: false,
      content: `Navigating the complex world of product certification can be daunting, but understanding the requirements is essential for bringing your electronic products to market. This comprehensive guide will help you understand and meet the latest certification standards.

**Understanding Certification Standards**

Electronic products must comply with various standards depending on their type, market, and application. The most common standards include:

- **CE Marking** (Europe): Required for products sold in the European Economic Area
- **FCC Certification** (USA): Mandatory for products that emit radio frequency energy
- **UL Certification**: Safety certification for electrical products
- **ISO Standards**: Quality management and environmental standards
- **IEC Standards**: International standards for electrical and electronic products

**Key Certification Requirements**

1. **EMC Compliance**: Your product must not interfere with other devices and must be immune to interference.

2. **Safety Standards**: Products must meet safety requirements to protect users from electrical hazards.

3. **Environmental Standards**: Many regions require compliance with environmental regulations like RoHS and WEEE.

4. **Radio Frequency**: Products with wireless capabilities need RF certification.

**The Certification Process**

1. **Preparation Phase**
   - Identify applicable standards
   - Review product specifications
   - Prepare technical documentation
   - Select a certified testing laboratory

2. **Testing Phase**
   - Submit product for testing
   - Address any non-compliance issues
   - Retest if necessary

3. **Documentation Phase**
   - Compile test reports
   - Prepare technical documentation
   - Create compliance declarations

4. **Certification Phase**
   - Submit documentation to certification body
   - Receive certification mark
   - Maintain ongoing compliance

**Common Challenges**

- **Multiple Standards**: Products often need to comply with multiple standards across different markets
- **Changing Regulations**: Standards evolve, requiring ongoing compliance monitoring
- **Cost Management**: Certification can be expensive, especially for small companies
- **Time Constraints**: The process can take weeks or months

**Best Practices**

- Start early in the product development process
- Work with experienced certification consultants
- Maintain detailed documentation throughout development
- Plan for certification costs and timelines
- Stay updated on regulatory changes
- Consider modular certification for product families

**Regional Considerations**

Different regions have different requirements:
- **North America**: Focus on FCC, UL, and CSA
- **Europe**: CE marking with various directives
- **Asia**: Country-specific requirements (CCC in China, PSE in Japan)
- **Global**: Consider international standards like IEC

**Staying Compliant**

Certification is not a one-time event. You must:
- Monitor regulatory changes
- Maintain documentation
- Handle product modifications
- Renew certifications as required
- Track compliance across product lifecycle

By understanding these requirements and following best practices, you can successfully navigate the certification process and bring your products to market efficiently and legally.`
    },
    {
      title: 'Advanced Calibration Techniques',
      description: 'Explore cutting-edge calibration methodologies that ensure precision and compliance across various electronic testing scenarios.',
      date: 'March 1, 2024',
      readTime: '6 min read',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      author: 'David Kim',
      views: '1.2K',
      featured: false,
      content: `Calibration is fundamental to ensuring measurement accuracy and compliance in electronic testing. Advanced calibration techniques have evolved significantly, incorporating automation, AI, and precision methodologies that were unimaginable just a few years ago.

**The Foundation of Calibration**

Calibration establishes the relationship between a measurement device and a known standard. This process ensures that measurements are accurate, traceable, and compliant with industry standards. Modern calibration goes beyond simple adjustments, incorporating comprehensive validation and uncertainty analysis.

**Advanced Calibration Methodologies**

1. **Automated Calibration Systems**
   Modern calibration systems use automation to reduce human error and increase throughput. These systems can:
   - Automatically identify instruments
   - Execute calibration procedures
   - Generate reports and certificates
   - Track calibration history

2. **AI-Powered Calibration**
   Artificial intelligence is revolutionizing calibration by:
   - Predicting when calibration is needed
   - Optimizing calibration intervals
   - Identifying drift patterns
   - Recommending maintenance actions

3. **Remote Calibration**
   With IoT connectivity, many instruments can now be calibrated remotely, reducing downtime and costs while maintaining accuracy.

4. **Multi-Point Calibration**
   Advanced techniques use multiple calibration points across the measurement range, providing better accuracy and linearity characterization.

**Precision and Traceability**

Maintaining traceability to national or international standards is crucial. Advanced calibration ensures:
- NIST traceability (or equivalent)
- Documented uncertainty budgets
- Chain of custody for standards
- Regular verification of calibration standards

**Calibration Intervals**

Determining optimal calibration intervals is both an art and a science. Factors to consider include:
- Instrument stability
- Usage frequency and conditions
- Criticality of measurements
- Historical drift data
- Regulatory requirements

**Environmental Considerations**

Advanced calibration accounts for environmental factors:
- Temperature and humidity control
- Electromagnetic interference
- Vibration and mechanical stress
- Atmospheric pressure variations

**Calibration Data Management**

Modern calibration systems include comprehensive data management:
- Digital calibration certificates
- Cloud-based record keeping
- Automated reminder systems
- Trend analysis and reporting
- Integration with quality management systems

**Industry-Specific Applications**

Different industries have specific calibration requirements:
- **Aerospace**: Extremely tight tolerances and extensive documentation
- **Medical**: FDA and ISO 13485 compliance
- **Automotive**: IATF 16949 requirements
- **Telecommunications**: FCC and international standards

**Best Practices**

1. Establish a calibration schedule based on risk assessment
2. Use accredited calibration laboratories
3. Maintain detailed calibration records
4. Monitor calibration results for trends
5. Implement automated calibration management systems
6. Train personnel on calibration procedures
7. Regularly audit calibration processes

**Future Trends**

The future of calibration includes:
- Fully automated calibration workflows
- Real-time calibration monitoring
- Predictive calibration scheduling
- Blockchain-based calibration records
- Integration with digital twins

Advanced calibration techniques are essential for maintaining measurement integrity in today's precision-driven industries. By adopting these methodologies, organizations can ensure accuracy, compliance, and operational efficiency.`
    },
    {
      title: 'Industry Trends: 2024 Outlook',
      description: 'An in-depth analysis of emerging trends and technologies shaping the future of electronic product development and testing.',
      date: 'February 28, 2024',
      readTime: '8 min read',
      category: 'Industry News',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      author: 'Lisa Wang',
      views: '2.8K',
      featured: false,
      content: `The electronic product development and testing industry is experiencing rapid transformation in 2024. Several key trends are reshaping how products are designed, tested, and brought to market.

**1. AI and Machine Learning Integration**

Artificial intelligence is no longer a future concept—it's here and transforming testing processes. AI-powered systems are:
- Automating test case generation
- Predicting failure modes before they occur
- Optimizing test coverage
- Reducing time-to-market by up to 40%

**2. Cloud-Based Testing Infrastructure**

The shift to cloud-based testing platforms continues to accelerate, offering:
- Scalable computing resources
- Global accessibility
- Reduced infrastructure costs
- Enhanced collaboration capabilities

**3. IoT and Edge Device Testing**

With the proliferation of IoT devices, testing methodologies are evolving to address:
- Connectivity testing across multiple protocols
- Edge computing validation
- Security and privacy concerns
- Power consumption optimization

**4. Sustainability and Green Testing**

Environmental considerations are becoming central to product development:
- Energy efficiency testing
- Carbon footprint analysis
- Sustainable material validation
- Circular economy compliance

**5. 5G and Next-Gen Connectivity**

The rollout of 5G networks is driving new testing requirements:
- Millimeter-wave testing
- Network slicing validation
- Ultra-low latency verification
- Massive IoT device support

**6. Cybersecurity Focus**

As products become more connected, security testing is critical:
- Penetration testing
- Vulnerability assessments
- Security certification
- Ongoing threat monitoring

**7. Agile and DevOps Integration**

Testing is becoming more integrated into development workflows:
- Continuous testing pipelines
- Shift-left testing strategies
- Automated regression testing
- Real-time quality metrics

**8. Regulatory Evolution**

Standards and regulations are evolving rapidly:
- New EU regulations (CE marking updates)
- Updated FCC requirements
- Emerging international standards
- Regional compliance variations

**Market Dynamics**

The testing services market is experiencing:
- Increased demand for specialized testing
- Growing importance of certification
- Rising complexity of products
- Need for faster turnaround times

**Technology Adoption**

Companies are investing in:
- Advanced simulation tools
- Automated testing equipment
- AI-powered analysis platforms
- Integrated quality management systems

**Challenges Ahead**

The industry faces several challenges:
- Keeping pace with rapid technology changes
- Managing increasing complexity
- Balancing speed and quality
- Attracting skilled talent
- Managing costs in competitive markets

**Opportunities**

Despite challenges, significant opportunities exist:
- Growing demand for testing services
- Emerging technology sectors
- International market expansion
- Service diversification
- Partnership and collaboration models

**Predictions for 2025**

Looking ahead, we can expect:
- Further AI integration
- Increased automation
- More stringent regulations
- Greater focus on sustainability
- Enhanced collaboration tools

**Conclusion**

The electronic product testing industry in 2024 is characterized by rapid innovation, increasing complexity, and growing importance. Companies that adapt to these trends and invest in modern testing capabilities will be well-positioned for success in the evolving marketplace.`
    },
    {
      title: 'Case Study: Successful Product Launch',
      description: 'Learn from a real-world case study of how proper testing and certification led to a successful product launch in competitive markets.',
      date: 'February 25, 2024',
      readTime: '9 min read',
      category: 'Case Studies',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      author: 'James Anderson',
      views: '1.5K',
      featured: false,
      content: `This case study examines how TechFlow Solutions, a mid-sized electronics manufacturer, successfully launched their flagship IoT device through comprehensive testing and certification strategies.

**Background**

TechFlow Solutions developed an innovative smart home hub designed to integrate multiple IoT devices. The product needed to launch in both North American and European markets within a tight timeline while meeting all regulatory requirements.

**The Challenge**

The company faced several challenges:
- Tight 6-month timeline to market
- Multiple certification requirements (FCC, CE, UL)
- Complex EMC testing requirements
- Limited in-house testing capabilities
- Budget constraints
- Competitive market pressure

**The Strategy**

TechFlow adopted a comprehensive testing and certification strategy:

1. **Early Engagement**
   - Engaged testing partners during design phase
   - Conducted pre-compliance testing
   - Identified issues before final design freeze

2. **Parallel Testing**
   - Ran multiple test types simultaneously
   - Coordinated with multiple certification bodies
   - Optimized test sequences to reduce time

3. **Risk Management**
   - Identified high-risk areas early
   - Developed contingency plans
   - Maintained buffer time for unexpected issues

**The Testing Process**

**Phase 1: Pre-Compliance (Months 1-2)**
- Initial EMC testing
- Design validation
- Early issue identification
- Design iterations based on results

**Phase 2: Formal Testing (Months 3-4)**
- Full EMC compliance testing
- Safety testing (UL)
- RF testing (FCC)
- Environmental testing

**Phase 3: Certification (Months 5-6)**
- Documentation preparation
- Certification body submissions
- Final compliance verification
- Certificate issuance

**Key Success Factors**

1. **Early Testing**: Starting testing during design phase saved significant time
2. **Expert Partnership**: Working with experienced testing partners accelerated the process
3. **Proactive Problem Solving**: Addressing issues immediately prevented delays
4. **Clear Communication**: Regular updates kept all stakeholders aligned
5. **Documentation Excellence**: Well-prepared documentation sped up certification

**Results**

The product launch was highly successful:
- ✅ Launched on schedule (6 months)
- ✅ All certifications obtained
- ✅ Zero compliance issues post-launch
- ✅ 40% faster than industry average
- ✅ 25% cost savings through efficient planning
- ✅ Strong market reception

**Lessons Learned**

1. **Start Early**: Begin testing and certification planning as early as possible
2. **Invest in Expertise**: Experienced partners provide invaluable guidance
3. **Plan for Contingencies**: Always build buffer time into schedules
4. **Maintain Quality**: Don't compromise on testing thoroughness
5. **Document Everything**: Good documentation is critical for certification

**Best Practices Identified**

- Integrate testing into design process
- Use pre-compliance testing to catch issues early
- Maintain open communication with all stakeholders
- Invest in proper documentation from the start
- Build relationships with certification bodies
- Plan for multiple market requirements simultaneously

**Impact on Business**

The successful launch resulted in:
- Strong first-year sales exceeding projections
- Enhanced brand reputation for quality
- Faster time-to-market for subsequent products
- Improved internal processes
- Competitive advantage in the market

**Recommendations**

For companies planning product launches:
1. Allocate sufficient budget for testing and certification
2. Engage testing partners early in the process
3. Build realistic timelines with buffer time
4. Invest in quality documentation
5. Consider multiple markets from the start
6. Maintain flexibility for design iterations

**Conclusion**

TechFlow's success demonstrates that with proper planning, expert partnerships, and a commitment to quality, companies can successfully navigate the complex world of product testing and certification while meeting aggressive timelines and budget constraints.`
    },
  ]

  const categories = ['All', 'Technology', 'Best Practices', 'Guide', 'Industry News', 'Case Studies']

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 90, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            rotate: [0, -90, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 overflow-visible"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100 mb-6"
          >
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-700">Latest Insights & Trends</span>
          </motion.div>

          <div className="flex items-center justify-center gap-3 mb-6 overflow-visible">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <TrendingUp className="w-10 h-10 text-primary" />
            </motion.div>
            <h2 className="text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent leading-[1.2] pb-3 inline-block">
              Blog
            </h2>
          </div>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest insights, trends, and best practices in electronic product testing and certification
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Blog Posts */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={selectedCategory}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {filteredPosts.map((post, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              whileHover={{ y: -15, scale: 1.02 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Category Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute top-4 left-4"
                >
                  <span className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                </motion.div>

                {/* Featured Badge */}
                {post.featured && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                  >
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </motion.div>
                )}

                {/* Views Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.views}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed text-base">
                  {post.description}
                </p>

                {/* Author */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{post.author}</span>
                  </div>
                </div>

                {/* Read More */}
                <motion.button
                  onClick={() => setSelectedPost(post)}
                  whileHover={{ x: 5 }}
                  className="text-primary hover:underline font-semibold flex items-center gap-2 group/link"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              {/* Hover Effect Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                initial={false}
              />
            </motion.article>
          ))}
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-primary via-purple-600 to-primary-dark rounded-3xl p-12 text-center text-white shadow-2xl mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-12 h-12" />
          </motion.div>
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">Stay Updated</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss the latest articles, insights, and industry updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-6 py-4 rounded-xl text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:shadow-xl transition-all whitespace-nowrap"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
        
        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center items-center gap-2"
        >
          {[1, 2, 3].map((dot) => (
            <motion.button
              key={dot}
              whileHover={{ scale: 1.3, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all ${
                dot === 1 
                  ? 'bg-primary w-8 h-3' 
                  : 'bg-gray-300 hover:bg-gray-400'
              } cursor-pointer`}
            />
          ))}
        </motion.div>
      </div>

      {/* Blog Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
            >
              {/* Modal Header */}
              <div className="relative">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
                  >
                    <X className="w-6 h-6 text-gray-900" />
                  </button>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-2 rounded-full text-xs font-semibold">
                        {selectedPost.category}
                      </span>
                      {selectedPost.featured && (
                        <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-3">{selectedPost.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-white/90">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{selectedPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{selectedPost.readTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{selectedPost.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 lg:p-12">
                <div className="max-w-3xl mx-auto">
                  {/* Blog Content with Proper Formatting */}
                  <article className="blog-content">
                    {(() => {
                      const content = selectedPost.content || selectedPost.description
                      const paragraphs = content.split('\n\n')
                      
                      return paragraphs.map((para, idx) => {
                        para = para.trim()
                        if (!para) return null
                        
                        // Check if it's a heading (starts with ** and ends with **)
                        if (para.match(/^\*\*[^*]+\*\*$/)) {
                          const headingText = para.replace(/\*\*/g, '')
                          return (
                            <h2 key={idx} className="text-3xl font-bold text-primary mt-10 mb-4 first:mt-0">
                              {headingText}
                            </h2>
                          )
                        }
                        
                        // Check if it's a list item
                        if (para.match(/^[-•]\s/)) {
                          const items = para.split('\n').filter(line => line.trim().match(/^[-•]\s/))
                          return (
                            <ul key={idx} className="list-disc list-inside my-6 space-y-2 text-gray-700">
                              {items.map((item, i) => (
                                <li key={i} className="leading-relaxed">
                                  {item.replace(/^[-•]\s/, '')}
                                </li>
                              ))}
                            </ul>
                          )
                        }
                        
                        // Check if it's a numbered list
                        if (para.match(/^\d+\.\s/)) {
                          const items = para.split('\n').filter(line => line.trim().match(/^\d+\.\s/))
                          return (
                            <ol key={idx} className="list-decimal list-inside my-6 space-y-2 text-gray-700">
                              {items.map((item, i) => (
                                <li key={i} className="leading-relaxed">
                                  {item.replace(/^\d+\.\s/, '')}
                                </li>
                              ))}
                            </ol>
                          )
                        }
                        
                        // Regular paragraph with bold formatting
                        const formattedPara = para
                          .split(/(\*\*.*?\*\*)/g)
                          .map((part, i) => {
                            if (part.match(/\*\*.*?\*\*/)) {
                              const boldText = part.replace(/\*\*/g, '')
                              return <strong key={i} className="font-semibold text-gray-900">{boldText}</strong>
                            }
                            return part
                          })
                        
                        return (
                          <p key={idx} className="text-gray-700 leading-relaxed mb-6 text-lg">
                            {formattedPara}
                          </p>
                        )
                      })
                    })()}
                  </article>

                  {/* Share Section */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                          {selectedPost.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">{selectedPost.author}</p>
                          <p className="text-sm text-gray-600">Author & Industry Expert</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                          Share
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedPost(null)}
                          className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                        >
                          Close
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Related Articles Suggestion */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">You might also like</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {blogPosts
                        .filter(post => post.title !== selectedPost.title && post.category === selectedPost.category)
                        .slice(0, 2)
                        .map((post, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => setSelectedPost(post)}
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="text-left p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                          >
                            <p className="font-semibold text-gray-900 mb-1 line-clamp-2">{post.title}</p>
                            <p className="text-sm text-gray-600">{post.readTime}</p>
                          </motion.button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Blog
