import os
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.pdfgen import canvas

pdf_output_path = r"C:\Users\marke\Downloads\TechAuditPros_USA_AI_Engineering_Blueprint.pdf"

class ClickableSlideCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(ClickableSlideCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_slide_frame(num_pages)
            super(ClickableSlideCanvas, self).showPage()
        super(ClickableSlideCanvas, self).save()

    def draw_slide_frame(self, page_count):
        self.saveState()
        # Clean white border line
        self.setStrokeColor(colors.HexColor('#4F46E5'))
        self.setLineWidth(2)
        self.rect(20, 20, 752, 572, fill=False, stroke=True)
        
        # Header banner line
        self.setStrokeColor(colors.HexColor('#E2E8F0'))
        self.setLineWidth(1)
        self.line(40, 555, 752, 555)
        
        # Header text
        self.setFillColor(colors.HexColor('#475569'))
        self.setFont("Helvetica-Bold", 9)
        self.drawString(40, 565, "TECHAUDITPROS | USA AI ENGINEERING & SEO (AEO/GEO) BLUEPRINT")
        
        # Footer text
        self.setFont("Helvetica-Bold", 9)
        self.setFillColor(colors.HexColor('#2563EB'))
        self.drawString(40, 30, "Official USA Portal: https://techauditpros.com/us/ | Contact: info@techauditpros.com")
        
        self.setFillColor(colors.HexColor('#64748B'))
        page_str = f"Slide {self._pageNumber} of {page_count}"
        self.drawRightString(752, 30, page_str)
        self.restoreState()

def build_pdf():
    doc = SimpleDocTemplate(
        pdf_output_path,
        pagesize=landscape(letter),
        leftMargin=40,
        rightMargin=40,
        topMargin=55,
        bottomMargin=45
    )
    
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=30,
        textColor=colors.HexColor('#0F172A'),
        alignment=0,
        spaceAfter=12
    )
    
    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=18,
        textColor=colors.HexColor('#2563EB'),
        spaceAfter=18
    )
    
    heading_style = ParagraphStyle(
        'SlideHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#4F46E5'),
        spaceAfter=12
    )
    
    body_style = ParagraphStyle(
        'SlideBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=16,
        textColor=colors.HexColor('#334155'),
        spaceAfter=10
    )

    quote_style = ParagraphStyle(
        'QuoteBody',
        parent=styles['Normal'],
        fontName='Helvetica-BoldOblique',
        fontSize=12,
        leading=17,
        textColor=colors.HexColor('#059669'),
        spaceAfter=12
    )

    story = []

    # SLIDE 1: COVER
    story.append(Spacer(1, 20))
    story.append(Paragraph("THE 2026 AI-NATIVE ENGINEERING BLUEPRINT", title_style))
    story.append(Paragraph("How USA Digital Agencies & Enterprises Scale Technical SEO (AEO/GEO), Web Engineering & ERP Systems", subtitle_style))
    story.append(Spacer(1, 10))
    story.append(Paragraph("<b>Author:</b> TechAuditPros Engineering Team", body_style))
    story.append(Paragraph("<b>Target Market:</b> United States (USA) & Global B2B Enterprises", body_style))
    story.append(Paragraph("<b>Primary Target URL:</b> <a href='https://techauditpros.com/us/'><font color='#2563EB'><u>https://techauditpros.com/us/</u></font></a>", body_style))
    story.append(Paragraph("<b>Core Capabilities:</b> Full-Spectrum SEO (AEO/GEO), Next.js Development, Custom ERP Portals", body_style))
    story.append(PageBreak())

    # SLIDE 2: EXECUTIVE SUMMARY & SHIFT
    story.append(Paragraph("1. Executive Summary: The AI Era Shift", heading_style))
    story.append(Paragraph("Everybody knows AI exists. But raw AI tools alone lack human vision, creative strategy, and enterprise security. TechAuditPros operates as an AI-Native Engineering Team—combining 110% Elite Human System Architecture with AI-Speed Fulfillment.", body_style))
    story.append(Paragraph("<i>'You already know AI can replace most digital work. We give you the system that actually does it—and we stand behind 100% performance execution.'</i>", quote_style))
    story.append(Paragraph("US agencies no longer buy manual labor hours or bloated local payroll overhead. They partner with TechAuditPros as their dedicated offshore technical backend in India to deliver 10x speed at up to 70% cost savings.", body_style))
    story.append(Paragraph("Global Portal: <a href='https://techauditpros.com/'><font color='#2563EB'><u>https://techauditpros.com/</u></font></a>", body_style))
    story.append(PageBreak())

    # SLIDE 3: PILLAR 1 - TECHNICAL SEO & AEO/GEO
    story.append(Paragraph("2. Pillar I: Full-Spectrum SEO (AEO & GEO)", heading_style))
    story.append(Paragraph("Search engine optimization has evolved beyond traditional Google keyword placement. In 2026, brands must dominate both traditional search engines and AI generative engines.", body_style))
    
    seo_data = [
        [Paragraph("<b>Vertical</b>", body_style), Paragraph("<b>Execution & Capability</b>", body_style)],
        [Paragraph("Technical SEO Audits", body_style), Paragraph("Crawl analysis, robots.txt, canonical tag control, Core Web Vitals 90+ speed.", body_style)],
        [Paragraph("AEO (Answer Engine)", body_style), Paragraph("Structuring direct 40-60 word Answer-First blocks for ChatGPT & Perplexity.", body_style)],
        [Paragraph("GEO (Generative AI)", body_style), Paragraph("Entity graph optimization, semantic JSON-LD schema, knowledge graph citations.", body_style)]
    ]
    t1 = Table(seo_data, colWidths=[170, 530])
    t1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('PADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t1)
    story.append(PageBreak())

    # SLIDE 4: PILLAR 2 - WEB ENGINEERING
    story.append(Paragraph("3. Pillar II: High-Performance Web Development", heading_style))
    story.append(Paragraph("Slow websites kill conversions and search rankings. TechAuditPros engineers ultra-fast, responsive web applications using modern Javascript frameworks and headless CMS architecture.", body_style))
    
    web_data = [
        [Paragraph("<b>Tech Stack</b>", body_style), Paragraph("<b>Performance Advantage</b>", body_style)],
        [Paragraph("Next.js & React", body_style), Paragraph("Server-side rendering (SSR) and static generation (ISR) for instant load times.", body_style)],
        [Paragraph("Core Web Vitals", body_style), Paragraph("LCP < 1.2s, INP < 100ms, CLS = 0. Guaranteeing 90+ Mobile PageSpeed scores.", body_style)],
        [Paragraph("Headless CMS", body_style), Paragraph("Decoupled content architecture for enterprise security and rapid scaling.", body_style)]
    ]
    t2 = Table(web_data, colWidths=[170, 530])
    t2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('PADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t2)
    story.append(PageBreak())

    # SLIDE 5: PILLAR 3 - CUSTOM ERP & BUSINESS SYSTEMS
    story.append(Paragraph("4. Pillar III: Enterprise ERP & Web Portals", heading_style))
    story.append(Paragraph("Custom software shouldn't take 12 months to build. TechAuditPros engineers custom ERP portals, CRM dashboards, and automated database workflows tailored for US enterprise operations.", body_style))
    
    erp_data = [
        [Paragraph("<b>Solution</b>", body_style), Paragraph("<b>Business Impact</b>", body_style)],
        [Paragraph("Custom ERP Dashboards", body_style), Paragraph("Centralized business portals tracking operations, inventory, and analytics.", body_style)],
        [Paragraph("Automated Workflows", body_style), Paragraph("Eliminating repetitive manual data entry with secure API integrations.", body_style)],
        [Paragraph("Client Portals", body_style), Paragraph("Dedicated white label client portals for real-time reporting and task tracking.", body_style)]
    ]
    t3 = Table(erp_data, colWidths=[170, 530])
    t3.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('PADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t3)
    story.append(PageBreak())

    # SLIDE 6: WHY USA AGENCIES CHOOSE TECHAUDITPROS
    story.append(Paragraph("5. Why USA Agencies Choose TechAuditPros", heading_style))
    story.append(Paragraph("<b>1. AI-Native Engineering Speed:</b> 10x delivery velocity compared to traditional manual agencies.<br/>"
                           "<b>2. 100% Performance Guarantee:</b> We stand behind measurable technical and search outcomes.<br/>"
                           "<b>3. Zero Payroll Overhead:</b> Scale your agency capacity without increasing local US salaries.<br/>"
                           "<b>4. Complete Transparency:</b> Daily Slack communication, monthly audit reporting, and dedicated project managers.", body_style))
    story.append(Spacer(1, 10))
    story.append(Paragraph("Target Page for USA Agencies: <a href='https://techauditpros.com/us/'><font color='#2563EB'><u>https://techauditpros.com/us/</u></font></a>", quote_style))
    story.append(PageBreak())

    # SLIDE 7: GLOBAL HUBS & CONTACT
    story.append(Paragraph("6. Global Hubs & Partnership Access", heading_style))
    story.append(Paragraph("TechAuditPros operates as a premier offshore technical backend for clients across 5 primary tier-1 markets:", body_style))
    
    hubs_data = [
        [Paragraph("<b>Market Hub</b>", body_style), Paragraph("<b>Official URL</b>", body_style)],
        [Paragraph("🇺🇸 USA Market Hub", body_style), Paragraph("<a href='https://techauditpros.com/us/'><font color='#2563EB'><u>https://techauditpros.com/us/</u></font></a>", body_style)],
        [Paragraph("🇬🇧 UK Market Hub", body_style), Paragraph("<a href='https://techauditpros.com/uk/'><font color='#2563EB'><u>https://techauditpros.com/uk/</u></font></a>", body_style)],
        [Paragraph("🇨🇦 Canada Market Hub", body_style), Paragraph("<a href='https://techauditpros.com/ca/'><font color='#2563EB'><u>https://techauditpros.com/ca/</u></font></a>", body_style)],
        [Paragraph("🇦🇺 Australia Market Hub", body_style), Paragraph("<a href='https://techauditpros.com/au/'><font color='#2563EB'><u>https://techauditpros.com/au/</u></font></a>", body_style)],
        [Paragraph("🇦🇪 Dubai (UAE) Hub", body_style), Paragraph("<a href='https://techauditpros.com/ae/'><font color='#2563EB'><u>https://techauditpros.com/ae/</u></font></a>", body_style)],
        [Paragraph("🌐 Global Homepage", body_style), Paragraph("<a href='https://techauditpros.com/'><font color='#2563EB'><u>https://techauditpros.com/</u></font></a>", body_style)]
    ]
    t4 = Table(hubs_data, colWidths=[180, 520])
    t4.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
        ('GRID', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('PADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t4)
    story.append(Spacer(1, 12))
    story.append(Paragraph("<b>Get Started:</b> Book your free technical AI audit at <a href='https://techauditpros.com/#contact'><font color='#2563EB'><u>https://techauditpros.com/#contact</u></font></a> or email <a href='mailto:info@techauditpros.com'><font color='#2563EB'><u>info@techauditpros.com</u></font></a>", body_style))

    doc.build(story, canvasmaker=ClickableSlideCanvas)
    print("Clickable PDF generated successfully at:", pdf_output_path)

if __name__ == "__main__":
    build_pdf()
