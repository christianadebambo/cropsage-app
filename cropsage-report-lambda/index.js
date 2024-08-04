const AWS = require('aws-sdk');
const PDFDocument = require('pdfkit');
const s3 = new AWS.S3();

// Helper function to get the unit for each soil data field
const getSoilDataUnit = (key) => {
  const units = {
    N: 'kg/ha',
    P: 'kg/ha',
    K: 'kg/ha',
    temperature: '°C',
    humidity: '%',
    ph: '',
    rainfall: 'mm'
  };
  return units[key] || '';
};

exports.generateReport = async (event) => {
    console.log('Event:', JSON.stringify(event));
    try {
        // Parse the input data
        let reportData;
        if (typeof event.body === 'string') {
            reportData = JSON.parse(event.body);
        } else if (typeof event.body === 'object') {
            reportData = event.body;
        } else {
            throw new Error('Invalid event body');
        }
        
        console.log('Report Data:', JSON.stringify(reportData));
        
        // Generate a unique report ID
        const reportId = `report-${Date.now()}`;
        const bucketName = process.env.S3_BUCKET_NAME;
        if (!bucketName) {
            throw new Error('S3_BUCKET_NAME environment variable is not set');
        }
        const key = `reports/${reportId}.pdf`;
        
        // Create a new PDF document
        const doc = new PDFDocument({
            size: 'A4',
            margin: 50
        });
        
        // Collect PDF chunks
        const chunks = [];
        doc.on('data', chunk => chunks.push(chunk));

        // Helper function to add a section title
        const addSectionTitle = (text) => {
            doc.fontSize(16).fillColor('#2c3e50').text(text, { underline: true });
            doc.moveDown();
        };

        // Helper function to add a field
        const addField = (label, value, unit = '') => {
            doc.fontSize(12).fillColor('#34495e').text(label + ": ", { continued: true })
               .fillColor('#2c3e50').text(value + (unit ? ' ' + unit : ''));
        };

        // Generate PDF content
        doc.fontSize(28).fillColor('#2c3e50').text('CropSage Report', 110, 50, { align: 'center' })
           .moveDown(2);

        // Add Date and Time
        const date = new Date(reportData.timestamp);
        const formattedDate = date.toLocaleString('en-US', { 
            timeZone: 'Africa/Lagos',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        addField('Date', formattedDate + ' (WAT)');
        doc.moveDown();

        // Add Farmer Information
        addSectionTitle('Farmer Information');
        addField('Name', `${reportData.firstName} ${reportData.lastName}`);
        addField('Email', reportData.email);
        addField('Farm Name', reportData.farmName);
        addField('Location', reportData.location);
        doc.moveDown(2);

        // Add Soil Data
        addSectionTitle('Soil Data');
        Object.entries(reportData.soilData).forEach(([key, value]) => {
            addField(key, value, getSoilDataUnit(key));
        });
        doc.moveDown(2);

        // Add Crop Recommendation
        addSectionTitle('Crop Recommendation');
        doc.fontSize(14).fillColor('#27ae60').text(reportData.recommendedCrop);
        doc.moveDown(2);

        // Add Sustainable Practices
        addSectionTitle('Sustainable Agricultural Practices');
        reportData.sustainablePractices.forEach(practice => {
            doc.fontSize(12).fillColor('#34495e').text('• ' + practice);
            doc.moveDown(0.5);
        });

        // Finalize the PDF
        await new Promise((resolve) => {
            doc.on('end', resolve);
            doc.end();
        });

        // Combine PDF chunks into a single buffer
        const pdfBuffer = Buffer.concat(chunks);

        // Upload the PDF to S3
        await s3.putObject({
            Bucket: bucketName,
            Key: key,
            Body: pdfBuffer,
            ContentType: 'application/pdf'
        }).promise();

        // Return success response
        return {
            statusCode: 200,
            body: JSON.stringify({ reportId })
        };
    } catch (error) {
        // Log and return error response
        console.error('Error generating report:', error);
        console.error('Error stack:', error.stack);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to generate report', error: error.message, stack: error.stack })
        };
    }
};
